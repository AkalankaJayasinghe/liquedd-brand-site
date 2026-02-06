import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Package, Plus, Search, Filter, MoreVertical, Edit2, Trash2,
  ChevronLeft, ChevronRight, Grid, List, Upload, X, Image,
  Check, AlertCircle, Loader, RefreshCw, Download, Eye,
  FolderPlus, Tag, DollarSign, Archive, Star, TrendingUp,
  LayoutDashboard, Sparkles, Camera, FileText, Settings
} from 'lucide-react';
import './ProductManagement.css';

const ProductManagement = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    stock: '',
    brand: '',
    volume: '',
    alcohol: '',
    origin: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  // Sample Data
  const sampleProducts = [
    {
      id: 1,
      name: "Johnnie Walker Black Label",
      brand: "Johnnie Walker",
      description: "A rich, complex blend of over 40 whiskies aged for a minimum of 12 years.",
      price: 12500,
      stock: 25,
      category_id: 1,
      category_name: "Whisky",
      volume: "750ml",
      alcohol: "40%",
      origin: "Scotland",
      image_url: "https://www.thewhiskyexchange.com/media/catalog/product/cache/1/image/500x500/9df78eab33525d08d6e5fb8d27136e95/j/o/johnnie_walker_black_label.jpg",
      featured: true,
      views: 1245,
      created_at: "2024-01-15"
    },
    {
      id: 2,
      name: "Absolut Elyx",
      brand: "Absolut",
      description: "Handcrafted in a vintage copper still for exceptional purity.",
      price: 28900,
      stock: 15,
      category_id: 2,
      category_name: "Vodka",
      volume: "750ml",
      alcohol: "42.3%",
      origin: "Sweden",
      image_url: "https://www.wineworld.lk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/b/absolut_elyx_750ml.jpg",
      featured: true,
      views: 980,
      created_at: "2024-01-14"
    },
    {
      id: 3,
      name: "Hendrick's Gin",
      brand: "Hendrick's",
      description: "Infused with cucumber and rose petals for a unique taste.",
      price: 11200,
      stock: 18,
      category_id: 3,
      category_name: "Gin",
      volume: "700ml",
      alcohol: "41.4%",
      origin: "Scotland",
      image_url: "https://cdn.shopify.com/s/files/1/0013/2477/7569/products/Hendricks-Gin_1024x1024.jpg",
      featured: false,
      views: 756,
      created_at: "2024-01-13"
    },
    {
      id: 4,
      name: "Hennessy VS Cognac",
      brand: "Hennessy",
      description: "Bold and fragrant with notes of oak and grapes.",
      price: 14800,
      stock: 22,
      category_id: 4,
      category_name: "Cognac",
      volume: "700ml",
      alcohol: "40%",
      origin: "France",
      image_url: "https://cdn.shopify.com/s/files/1/0013/2477/7569/products/Hennessy-VS_1024x1024.jpg",
      featured: false,
      views: 634,
      created_at: "2024-01-12"
    },
    {
      id: 5,
      name: "Moët & Chandon Imperial",
      brand: "Moët & Chandon",
      description: "The iconic champagne with bright fruitiness and elegant maturity.",
      price: 22500,
      stock: 12,
      category_id: 5,
      category_name: "Champagne",
      volume: "750ml",
      alcohol: "12%",
      origin: "France",
      image_url: "https://cdn.shopify.com/s/files/1/0013/2477/7569/products/Moet-Imperial_1024x1024.jpg",
      featured: true,
      views: 1120,
      created_at: "2024-01-11"
    },
    {
      id: 6,
      name: "Rockland Red Rum",
      brand: "Rockland",
      description: "Sri Lanka's premium rum with a smooth, rich flavor profile.",
      price: 4500,
      stock: 50,
      category_id: 6,
      category_name: "Rum",
      volume: "750ml",
      alcohol: "34%",
      origin: "Sri Lanka",
      image_url: "https://rockland.lk/wp-content/uploads/2021/08/Rockland-Red-Rum-750ml.png",
      featured: false,
      views: 432,
      created_at: "2024-01-10"
    }
  ];

  const sampleCategories = [
    { id: 1, name: 'Whisky', product_count: 45 },
    { id: 2, name: 'Vodka', product_count: 28 },
    { id: 3, name: 'Gin', product_count: 18 },
    { id: 4, name: 'Cognac', product_count: 15 },
    { id: 5, name: 'Champagne', product_count: 22 },
    { id: 6, name: 'Rum', product_count: 32 },
    { id: 7, name: 'Tequila', product_count: 12 },
    { id: 8, name: 'Arrack', product_count: 8 }
  ];

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProducts(sampleProducts);
      setCategories(sampleCategories);
      setLoading(false);
    };
    loadData();
  }, []);

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category_id === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.created_at) - new Date(a.created_at);
      case 'oldest': return new Date(a.created_at) - new Date(b.created_at);
      case 'price-high': return b.price - a.price;
      case 'price-low': return a.price - b.price;
      case 'name': return a.name.localeCompare(b.name);
      case 'stock-low': return a.stock - b.stock;
      default: return 0;
    }
  });

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    total: products.length,
    lowStock: products.filter(p => p.stock < 10).length,
    featured: products.filter(p => p.featured).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  };

  // Handlers
  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    showToast('Products refreshed!', 'success');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (file) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('File size should be less than 5MB', 'error');
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileChange(file);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Product name is required';
    if (!formData.price || formData.price <= 0) errors.price = 'Valid price is required';
    if (!formData.category_id) errors.category_id = 'Category is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, image_url: imagePreview || p.image_url }
          : p
      ));
      showToast('Product updated successfully!', 'success');
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        image_url: imagePreview,
        category_name: categories.find(c => c.id === parseInt(formData.category_id))?.name,
        views: 0,
        featured: false,
        created_at: new Date().toISOString()
      };
      setProducts(prev => [newProduct, ...prev]);
      showToast('Product created successfully!', 'success');
    }

    setIsSubmitting(false);
    closeModal();
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
      volume: product.volume || '',
      alcohol: product.alcohol || '',
      origin: product.origin || '',
      image: null
    });
    setImagePreview(product.image_url);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setProducts(prev => prev.filter(p => p.id !== id));
    setShowDeleteConfirm(null);
    showToast('Product deleted successfully!', 'success');
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    await new Promise(resolve => setTimeout(resolve, 500));
    setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
    setSelectedProducts([]);
    showToast(`${selectedProducts.length} products deleted!`, 'success');
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    }
  };

  const toggleProductSelect = (id) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;

    await new Promise(resolve => setTimeout(resolve, 500));
    const newCat = {
      id: Date.now(),
      name: newCategory.name,
      product_count: 0
    };
    setCategories(prev => [...prev, newCat]);
    setShowCategoryModal(false);
    setNewCategory({ name: '', description: '' });
    showToast('Category created!', 'success');
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
      volume: '',
      alcohol: '',
      origin: '',
      image: null
    });
    setImagePreview(null);
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setImagePreview(null);
    setFormErrors({});
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Loading State
  if (loading) {
    return (
      <div className="pm-loading">
        <div className="loading-content">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <Package size={32} className="spinner-icon" />
          </div>
          <h2>Loading Products</h2>
          <p>Please wait...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-management">
      {/* Background Effects */}
      <div className="pm-bg">
        <div className="bg-gradient"></div>
        <div className="bg-grid"></div>
      </div>

      {/* Sidebar */}
      <aside className="pm-sidebar">
        <div className="sidebar-header">
          <Link to="/admin/dashboard" className="sidebar-logo">
            <Sparkles size={24} />
            <span>Ceylon Spirits</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className="nav-item">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/products" className="nav-item active">
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link to="/admin/categories" className="nav-item">
            <Tag size={20} />
            <span>Categories</span>
          </Link>
          <Link to="/admin/settings" className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="sidebar-stats">
          <h4>Quick Stats</h4>
          <div className="stat-mini">
            <Package size={16} />
            <span>{stats.total} Products</span>
          </div>
          <div className="stat-mini warning">
            <AlertCircle size={16} />
            <span>{stats.lowStock} Low Stock</span>
          </div>
          <div className="stat-mini success">
            <Star size={16} />
            <span>{stats.featured} Featured</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pm-main">
        {/* Header */}
        <header className="pm-header">
          <div className="header-left">
            <div className="header-title">
              <h1>Product Management</h1>
              <p>Manage your product catalog</p>
            </div>
          </div>

          <div className="header-right">
            <button 
              className={`btn-icon ${refreshing ? 'refreshing' : ''}`}
              onClick={handleRefresh}
              title="Refresh"
            >
              <RefreshCw size={20} />
            </button>
            <button className="btn-icon" title="Export">
              <Download size={20} />
            </button>
            <button className="btn-primary" onClick={openModal}>
              <Plus size={20} />
              <span>Add Product</span>
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="pm-stats">
          <div className="stat-card" style={{ '--accent': '#10B981' }}>
            <div className="stat-icon">
              <Package size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total Products</span>
            </div>
            <TrendingUp size={20} className="stat-trend" />
          </div>

          <div className="stat-card" style={{ '--accent': '#F59E0B' }}>
            <div className="stat-icon">
              <AlertCircle size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.lowStock}</span>
              <span className="stat-label">Low Stock</span>
            </div>
          </div>

          <div className="stat-card" style={{ '--accent': '#8B5CF6' }}>
            <div className="stat-icon">
              <Star size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.featured}</span>
              <span className="stat-label">Featured</span>
            </div>
          </div>

          <div className="stat-card" style={{ '--accent': '#D4AF37' }}>
            <div className="stat-icon">
              <DollarSign size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{formatPrice(stats.totalValue)}</span>
              <span className="stat-label">Inventory Value</span>
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <div className="pm-toolbar">
          <div className="toolbar-left">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>
                  <X size={16} />
                </button>
              )}
            </div>

            <select 
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="name">Name A-Z</option>
              <option value="stock-low">Stock: Low First</option>
            </select>
          </div>

          <div className="toolbar-right">
            {selectedProducts.length > 0 && (
              <button className="btn-danger" onClick={handleBulkDelete}>
                <Trash2 size={18} />
                <span>Delete ({selectedProducts.length})</span>
              </button>
            )}

            <div className="view-toggle">
              <button 
                className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
              >
                <List size={18} />
              </button>
              <button 
                className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Display */}
        <div className="pm-content">
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Package size={60} />
              </div>
              <h3>No Products Found</h3>
              <p>
                {searchQuery || selectedCategory !== 'all' 
                  ? 'Try adjusting your filters'
                  : 'Add your first product to get started'}
              </p>
              <button className="btn-primary" onClick={openModal}>
                <Plus size={20} />
                Add Product
              </button>
            </div>
          ) : viewMode === 'table' ? (
            <div className="table-container">
              <table className="products-table">
                <thead>
                  <tr>
                    <th className="th-checkbox">
                      <label className="custom-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedProducts.length === paginatedProducts.length}
                          onChange={toggleSelectAll}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Views</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product, index) => (
                    <tr 
                      key={product.id}
                      className={`${selectedProducts.includes(product.id) ? 'selected' : ''}`}
                      style={{ '--delay': `${index * 0.05}s` }}
                    >
                      <td className="td-checkbox">
                        <label className="custom-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => toggleProductSelect(product.id)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td className="td-product">
                        <div className="product-cell">
                          <div className="product-image">
                            {product.image_url ? (
                              <img src={product.image_url} alt={product.name} />
                            ) : (
                              <div className="image-placeholder">
                                {product.name.charAt(0)}
                              </div>
                            )}
                            {product.featured && (
                              <span className="featured-badge">
                                <Star size={10} />
                              </span>
                            )}
                          </div>
                          <div className="product-info">
                            <h4>{product.name}</h4>
                            <span className="product-brand">{product.brand}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="category-badge">{product.category_name}</span>
                      </td>
                      <td className="td-price">{formatPrice(product.price)}</td>
                      <td>
                        <span className={`stock-badge ${product.stock < 10 ? 'low' : product.stock < 20 ? 'medium' : 'high'}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="td-views">
                        <Eye size={14} />
                        {product.views}
                      </td>
                      <td className="td-actions">
                        <button 
                          className="action-btn edit"
                          onClick={() => handleEdit(product)}
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => setShowDeleteConfirm(product.id)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="products-grid">
              {paginatedProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className={`product-card ${selectedProducts.includes(product.id) ? 'selected' : ''}`}
                  style={{ '--delay': `${index * 0.05}s` }}
                >
                  <div className="card-checkbox">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelect(product.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>

                  {product.featured && (
                    <span className="card-featured">
                      <Star size={12} /> Featured
                    </span>
                  )}

                  <div className="card-image">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} />
                    ) : (
                      <div className="image-placeholder large">
                        <Package size={40} />
                      </div>
                    )}
                  </div>

                  <div className="card-content">
                    <span className="card-category">{product.category_name}</span>
                    <h3 className="card-title">{product.name}</h3>
                    <p className="card-brand">{product.brand}</p>
                    
                    <div className="card-meta">
                      <span className="card-price">{formatPrice(product.price)}</span>
                      <span className={`card-stock ${product.stock < 10 ? 'low' : ''}`}>
                        {product.stock} in stock
                      </span>
                    </div>

                    <div className="card-actions">
                      <button className="card-btn edit" onClick={() => handleEdit(product)}>
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button className="card-btn delete" onClick={() => setShowDeleteConfirm(product.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                <ChevronLeft size={18} />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Product Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <Package size={24} />
                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid">
                {/* Image Upload */}
                <div className="form-section image-section">
                  <label>Product Image</label>
                  <div 
                    ref={dropZoneRef}
                    className={`image-dropzone ${isDragging ? 'dragging' : ''} ${imagePreview ? 'has-image' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e.target.files[0])}
                      hidden
                    />
                    
                    {imagePreview ? (
                      <div className="preview-container">
                        <img src={imagePreview} alt="Preview" />
                        <button 
                          type="button"
                          className="remove-image"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImagePreview(null);
                            setFormData(prev => ({ ...prev, image: null }));
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="dropzone-content">
                        <Camera size={40} />
                        <p>Drag & drop or click to upload</p>
                        <span>PNG, JPG up to 5MB</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Basic Info */}
                <div className="form-section">
                  <div className="form-group">
                    <label>
                      Product Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Johnnie Walker Black Label"
                      className={formErrors.name ? 'error' : ''}
                    />
                    {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label>Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      placeholder="e.g., Johnnie Walker"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Price (LKR) <span className="required">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className={formErrors.price ? 'error' : ''}
                      />
                      {formErrors.price && <span className="error-text">{formErrors.price}</span>}
                    </div>

                    <div className="form-group">
                      <label>Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Category <span className="required">*</span>
                    </label>
                    <div className="category-row">
                      <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleInputChange}
                        className={formErrors.category_id ? 'error' : ''}
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                      <button 
                        type="button"
                        className="btn-add-category"
                        onClick={() => setShowCategoryModal(true)}
                      >
                        <FolderPlus size={18} />
                      </button>
                    </div>
                    {formErrors.category_id && <span className="error-text">{formErrors.category_id}</span>}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="form-section full-width">
                  <div className="form-row three-cols">
                    <div className="form-group">
                      <label>Volume</label>
                      <input
                        type="text"
                        name="volume"
                        value={formData.volume}
                        onChange={handleInputChange}
                        placeholder="e.g., 750ml"
                      />
                    </div>
                    <div className="form-group">
                      <label>Alcohol %</label>
                      <input
                        type="text"
                        name="alcohol"
                        value={formData.alcohol}
                        onChange={handleInputChange}
                        placeholder="e.g., 40%"
                      />
                    </div>
                    <div className="form-group">
                      <label>Origin</label>
                      <input
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleInputChange}
                        placeholder="e.g., Scotland"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Product description..."
                      rows="4"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      <span>{editingProduct ? 'Update Product' : 'Create Product'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
          <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <FolderPlus size={24} />
                <h2>Create Category</h2>
              </div>
              <button className="modal-close" onClick={() => setShowCategoryModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="modal-form">
              <div className="form-group">
                <label>Category Name <span className="required">*</span></label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Whisky, Vodka"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Optional description..."
                  rows="3"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowCategoryModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  <Check size={18} />
                  <span>Create</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">
              <Trash2 size={40} />
            </div>
            <h3>Delete Product?</h3>
            <p>This action cannot be undone. The product will be permanently removed.</p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={() => handleDelete(showDeleteConfirm)}>
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast ${toast.type}`}>
          {toast.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;