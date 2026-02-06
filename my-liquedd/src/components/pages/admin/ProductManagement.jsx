import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import { productService } from '../../../services/productService';
import { categoryService } from '../../../services/categoryService';
import './ProductManagement.css';

const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    stock: '',
    brand: '',
    image: null
  });
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check authentication
    if (!authService.isAuthenticated() || !authService.isAdmin()) {
      navigate('/admin/login');
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Failed to load data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Create new category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!newCategory.name.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      await categoryService.createCategory(newCategory);
      setSuccess('Category created successfully!');
      setShowCategoryModal(false);
      setNewCategory({ name: '', description: '' });
      fetchData(); // Refresh categories
    } catch (err) {
      setError(err.message || 'Failed to create category');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, formData);
        setSuccess('Product updated successfully!');
      } else {
        await productService.createProduct(formData);
        setSuccess('Product created successfully!');
      }

      fetchData();
      closeModal();
    } catch (err) {
      setError(err.message || 'Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      category_id: product.category_id,
      stock: product.stock || 0,
      brand: product.brand || '',
      image: null
    });
    setImagePreview(product.image_url || null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productService.deleteProduct(id);
      setSuccess('Product deleted successfully!');
      fetchData();
    } catch (err) {
      setError('Failed to delete product: ' + err.message);
    }
  };

  const openModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category_id: '',
      stock: '',
      brand: '',
      image: null
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setImagePreview(null);
    setError('');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-management">
      <div className="management-header">
        <div>
          <h1>Product Management</h1>
          <p>Manage your product catalog</p>
        </div>
        <div className="header-actions">
          <button onClick={() => navigate('/admin/dashboard')} className="back-button">
            ← Back to Dashboard
          </button>
          <button onClick={openModal} className="add-button">
            + Add Product
          </button>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price (LKR)</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No products found. Add your first product!
                </td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id}>
                  <td>
                    {product.image_url ? (
                      <img 
                        src={product.image_url.startsWith('http') ? product.image_url : `http://localhost:5000${product.image_url}`} 
                        alt={product.name}
                        className="product-thumbnail"
                      />
                    ) : (
                      <div className="no-image">{product.name.charAt(0)}</div>
                    )}
                  </td>
                  <td className="product-name">{product.name}</td>
                  <td>{product.brand || '-'}</td>
                  <td>{product.category_name || 'Uncategorized'}</td>
                  <td className="product-price">LKR {parseFloat(product.price).toLocaleString()}</td>
                  <td>{product.stock || 0}</td>
                  <td className="actions">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={closeModal} className="close-button">×</button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter product name"
                />
              </div>

              <div className="form-group">
                <label>Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="Enter brand name (e.g., Johnnie Walker)"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter product description"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (LKR) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                  />
                </div>

                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Category *</label>
                <div className="category-select-row">
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <button 
                    type="button" 
                    className="btn-add-category"
                    onClick={() => setShowCategoryModal(true)}
                  >
                    + New
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Product Image</label>
                <div className="image-upload-area">
                  {imagePreview || (editingProduct && editingProduct.image_url) ? (
                    <div className="image-preview">
                      <img 
                        src={imagePreview || editingProduct.image_url} 
                        alt="Preview" 
                      />
                      <button 
                        type="button" 
                        className="remove-image"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, image: null }));
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label className="upload-placeholder">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <span className="upload-icon">📷</span>
                      <span>Click to upload image</span>
                      <small>JPG, PNG, GIF, WebP (Max 5MB)</small>
                    </label>
                  )}
                </div>
              </div>

              {error && <div className="form-error">{error}</div>}

              <div className="form-actions">
                <button type="button" onClick={closeModal} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Creation Modal */}
      {showCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
          <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Category</h2>
              <button onClick={() => setShowCategoryModal(false)} className="close-button">×</button>
            </div>
            
            <form onSubmit={handleCreateCategory} className="product-form">
              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="e.g., Whisky, Vodka, Rum"
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  placeholder="Category description (optional)"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => setShowCategoryModal(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
