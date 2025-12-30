import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: ''
  });
  const [sortBy, setSortBy] = useState('name');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts({ category_id: filters.category, search: filters.search }),
          categoryService.getCategories()
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message || 'Failed to load products');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      search: ''
    });
  };

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="products">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="container">
          <h1>Our Products</h1>
          <p>Discover our complete range of premium beverages</p>
        </div>
      </section>

      <section className="products-content section">
        <div className="container">
          <div className="products-layout">
            {/* Filters Sidebar */}
            <aside className="filters-sidebar">
              <div className="filters-header">
                <h3>Filters</h3>
                <button onClick={clearFilters} className="clear-filters">
                  Clear All
                </button>
              </div>

              <div className="filter-group">
                <label>Search</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="filter-group">
                <label>Category</label>
                <select 
                  value={filters.category} 
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </aside>

            {/* Products Main Content */}
            <main className="products-main">
              {/* Sort and Results Info */}
              <div className="products-header">
                <div className="results-info">
                  <p>Showing {sortedProducts.length} products</p>
                </div>
                
                <div className="sort-options">
                  <label>Sort by:</label>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <div className="products-grid">
                {sortedProducts.length === 0 ? (
                  <div className="no-products">
                    <p>No products found.</p>
                    <button onClick={clearFilters} className="btn btn-primary">
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  sortedProducts.map(product => (
                    <div key={product.id} className="product-card card">
                      <div className="product-image">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} />
                        ) : (
                          <div className="no-image-placeholder">
                            <span>No Image</span>
                          </div>
                        )}
                        <div className="product-overlay">
                          <button className="btn btn-primary">View Details</button>
                        </div>
                      </div>
                      
                      <div className="product-info">
                        <div className="product-category">
                          {product.category_name || 'Uncategorized'}
                        </div>
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-description">
                          {product.description || 'No description available'}
                        </p>
                        
                        <div className="product-details">
                          <div className="product-stock">
                            <strong>Stock:</strong> {product.stock || 0} units
                          </div>
                        </div>
                        
                        <div className="product-footer">
                          <div className="product-price">
                            ${parseFloat(product.price).toFixed(2)}
                          </div>
                          <button className="btn btn-secondary">Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;