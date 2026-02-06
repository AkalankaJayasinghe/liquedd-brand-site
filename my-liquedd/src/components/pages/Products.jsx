import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, Grid, List, X, SlidersHorizontal,
  ArrowRight, Sparkles, Eye, Star, Globe, Wine,
  Award, ChevronDown, Heart, Droplets, MapPin
} from 'lucide-react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import './Products.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [showQuickView, setShowQuickView] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    category: searchParams.get('category') || 'all',
    priceRange: 'all',
    brand: 'all',
    origin: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  const heroRef = useRef(null);

  // Fetch products and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories()
        ]);
        
        // Transform products data to match frontend format
        const transformedProducts = productsData.map(product => ({
          id: product.id,
          name: product.name,
          brand: product.brand || 'Premium',
          category: product.category_name?.toLowerCase() || 'spirits',
          price: parseFloat(product.price),
          originalPrice: product.original_price ? parseFloat(product.original_price) : null,
          image: product.image_url || product.image || 'https://via.placeholder.com/400',
          rating: product.rating || 4.5,
          reviews: product.reviews || 0,
          volume: product.volume || '750ml',
          alcohol: product.alcohol || '40%',
          origin: product.origin || 'International',
          featured: product.featured || false,
          badge: product.badge || null,
          description: product.description || 'Premium quality spirits',
          tastingNotes: product.tasting_notes ? product.tasting_notes.split(',') : ['Premium', 'Quality', 'Refined'],
          year: product.year || 2000
        }));
        
        // Transform categories data
        const transformedCategories = [
          { id: 'all', name: 'All Spirits', icon: <Sparkles size={16} />, count: transformedProducts.length },
          ...categoriesData.map(cat => ({
            id: cat.id,
            name: cat.name,
            icon: <Wine size={16} />,
            count: transformedProducts.filter(p => p.category === cat.name.toLowerCase()).length
          }))
        ];
        
        setProducts(transformedProducts);
        setCategories(transformedCategories);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 30;
        const y = (clientY / window.innerHeight - 0.5) * 30;
        setMousePosition({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Brand categories with Sri Lankan and international brands
  const brandsList = [
    { id: 'all', name: 'All Brands', country: 'all', initials: 'ALL' },
    // Sri Lankan Brands
    { id: 'ceylon-spirits', name: 'Ceylon Spirits', country: 'sri-lanka', initials: 'CS' },
    { id: 'rockland', name: 'Rockland', country: 'sri-lanka', initials: 'RL' },
    { id: 'old-arrack', name: 'Old Arrack', country: 'sri-lanka', initials: 'OA' },
    { id: 'dcsl', name: 'DCSL', country: 'sri-lanka', initials: 'DC' },
    { id: 'idl', name: 'IDL', country: 'sri-lanka', initials: 'ID' },
    { id: 'mendis', name: 'Mendis', country: 'sri-lanka', initials: 'ME' },
    // International Brands
    { id: 'jack-daniels', name: "Jack Daniel's", country: 'usa', initials: 'JD' },
    { id: 'johnnie-walker', name: 'Johnnie Walker', country: 'scotland', initials: 'JW' },
    { id: 'smirnoff', name: 'Smirnoff', country: 'russia', initials: 'SM' },
    { id: 'bacardi', name: 'Bacardi', country: 'cuba', initials: 'BC' },
    { id: 'absolut', name: 'Absolut', country: 'sweden', initials: 'AB' },
    { id: 'corona', name: 'Corona', country: 'mexico', initials: 'CO' },
    { id: 'heineken', name: 'Heineken', country: 'netherlands', initials: 'HE' },
    { id: 'chivas', name: 'Chivas Regal', country: 'scotland', initials: 'CV' },
    { id: 'grey-goose', name: 'Grey Goose', country: 'france', initials: 'GG' },
    { id: 'tanqueray', name: 'Tanqueray', country: 'england', initials: 'TQ' }
  ];

  const countries = [
    { id: 'all', name: 'All Countries', flag: '🌍' },
    { id: 'sri-lanka', name: 'Sri Lanka', flag: '🇱🇰' },
    { id: 'usa', name: 'USA', flag: '🇺🇸' },
    { id: 'scotland', name: 'Scotland', flag: '🏴' },
    { id: 'russia', name: 'Russia', flag: '🇷🇺' },
    { id: 'cuba', name: 'Cuba', flag: '🇨🇺' },
    { id: 'sweden', name: 'Sweden', flag: '🇸🇪' },
    { id: 'mexico', name: 'Mexico', flag: '🇲🇽' },
    { id: 'netherlands', name: 'Netherlands', flag: '🇳🇱' },
    { id: 'france', name: 'France', flag: '🇫🇷' },
    { id: 'england', name: 'England', flag: '🏴' }
  ];

  // Origins
  const origins = [...new Set(products.map(p => p.origin))];

  // Brands from products
  const brands = [...new Set(products.map(p => p.brand))];

  // Filter Products
  const filteredProducts = products.filter(product => {
    if (activeFilters.category !== 'all' && product.category !== activeFilters.category) return false;
    if (activeFilters.brand !== 'all' && product.brand !== activeFilters.brand) return false;
    if (activeFilters.origin !== 'all' && product.origin !== activeFilters.origin) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!product.name.toLowerCase().includes(query) && 
          !product.brand.toLowerCase().includes(query) &&
          !product.category.toLowerCase().includes(query) &&
          !product.origin.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    return true;
  });

  // Sort Products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.year - a.year;
      case 'oldest': return a.year - b.year;
      case 'name': return a.name.localeCompare(b.name);
      default: return b.featured - a.featured;
    }
  });

  // Toggle Favorites
  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Format Price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="products-page">
      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 15}s`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          />
        ))}
      </div>

      {/* HERO */}
      <section className="products-hero" ref={heroRef}>
        <div className="hero-bg">
          <video autoPlay muted loop playsInline>
            <source src="https://videos.pexels.com/video-files/855078/855078-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay"></div>
        
        {/* Animated Bottles */}
        <div className="hero-bottles">
          <div className="floating-bottle bottle-1" style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}>
            <img src="https://www.thewhiskyexchange.com/media/catalog/product/cache/1/image/500x500/9df78eab33525d08d6e5fb8d27136e95/j/o/johnnie_walker_black_label.jpg" alt="" />
          </div>
          <div className="floating-bottle bottle-2" style={{
            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`
          }}>
            <img src="https://cdn.shopify.com/s/files/1/0013/2477/7569/products/Hendricks-Gin_1024x1024.jpg" alt="" />
          </div>
          <div className="floating-bottle bottle-3" style={{
            transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * -0.4}px)`
          }}>
            <img src="https://cdn.shopify.com/s/files/1/0013/2477/7569/products/Moet-Imperial_1024x1024.jpg" alt="" />
          </div>
        </div>

        <div className="hero-content">
          <span className="hero-badge animate-float">
            <Sparkles size={16} /> CURATED COLLECTION
          </span>
          <h1 className="hero-title">
            <span className="title-line">Discover</span>
            <span className="title-line highlight">Premium Spirits</span>
          </h1>
          <p className="hero-description">
            Explore our exquisite selection of the world's finest spirits, 
            carefully curated for the discerning connoisseur.
          </p>
          
          {/* Hero Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{products.length}+</span>
              <span className="stat-label">Premium Bottles</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{brands.length}</span>
              <span className="stat-label">World Brands</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{origins.length}</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Explore Collection</span>
          <ChevronDown className="bounce" size={24} />
        </div>
      </section>

      {/* Category Pills - Floating */}
      <section className="category-showcase">
        <div className="category-scroll">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              className={`category-pill ${activeFilters.category === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilters(prev => ({ ...prev, category: cat.id }))}
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <span className="pill-icon">{cat.icon}</span>
              <span className="pill-name">{cat.name}</span>
              <span className="pill-count">{cat.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="products-main">
        <div className="products-container">
          
          {/* SIDEBAR FILTERS */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : 'hide'}`}>
            <div className="sidebar-glow"></div>
            
            <div className="filters-header">
              <h3>
                <SlidersHorizontal size={20} /> 
                <span>Refine Selection</span>
              </h3>
              <button 
                className="clear-all"
                onClick={() => {
                  setActiveFilters({
                    category: 'all',
                    priceRange: 'all',
                    brand: 'all',
                    origin: 'all'
                  });
                  setSearchQuery('');
                }}
              >
                Reset All
              </button>
            </div>

            {/* Search */}
            <div className="filter-group">
              <label>
                <Search size={16} />
                Search
              </label>
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search spirits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="clear-search" onClick={() => setSearchQuery('')}>
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Origins */}
            <div className="filter-group">
              <label>
                <Globe size={16} />
                Origin Country
              </label>
              <div className="filter-options">
                <button
                  className={`filter-option ${activeFilters.origin === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilters(prev => ({ ...prev, origin: 'all' }))}
                >
                  <span>All Countries</span>
                </button>
                {origins.map(origin => (
                  <button
                    key={origin}
                    className={`filter-option ${activeFilters.origin === origin ? 'active' : ''}`}
                    onClick={() => setActiveFilters(prev => ({ ...prev, origin }))}
                  >
                    <MapPin size={14} />
                    <span>{origin}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="filter-group">
              <label>
                <Award size={16} />
                Brands
              </label>
              
              {/* Brand Circles */}
              <div className="brand-circles-grid">
                {brandsList.map(brand => (
                  <button
                    key={brand.id}
                    className={`brand-circle ${activeFilters.brand === brand.id ? 'active' : ''}`}
                    onClick={() => setActiveFilters(prev => ({ ...prev, brand: brand.id }))}
                    title={brand.name}
                  >
                    {brand.initials}
                  </button>
                ))}
              </div>
              
              {/* Brand List with Country Filter */}
              <div className="filter-options scrollable" style={{ maxHeight: '280px', marginTop: '1rem' }}>
                <button
                  className={`filter-option ${activeFilters.brand === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilters(prev => ({ ...prev, brand: 'all' }))}
                >
                  <Award size={14} />
                  <span>All Brands</span>
                </button>
                {brandsList.slice(1).map(brand => (
                  <button
                    key={brand.id}
                    className={`filter-option ${activeFilters.brand === brand.id ? 'active' : ''}`}
                    onClick={() => setActiveFilters(prev => ({ ...prev, brand: brand.id }))}
                  >
                    <span className="brand-flag">
                      {countries.find(c => c.id === brand.country)?.flag || '🌍'}
                    </span>
                    <span>{brand.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCTS AREA */}
          <main className="products-area">
            {/* Toolbar */}
            <div className="products-toolbar">
              <div className="toolbar-left">
                <button 
                  className="filter-toggle"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={18} />
                  <span>Filters</span>
                </button>
                <div className="results-info">
                  <span className="results-count">{sortedProducts.length}</span>
                  <span className="results-text">Premium Spirits</span>
                </div>
              </div>

              <div className="toolbar-right">
                <div className="sort-dropdown">
                  <label>Sort:</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="featured">Featured</option>
                    <option value="rating">Top Rated</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Heritage First</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>

                <div className="view-modes">
                  <button 
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List View"
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Tags */}
            {(activeFilters.category !== 'all' || activeFilters.brand !== 'all' || activeFilters.origin !== 'all' || searchQuery) && (
              <div className="active-filters-tags">
                <span className="tags-label">Active Filters:</span>
                {activeFilters.category !== 'all' && (
                  <span className="filter-tag">
                    {categories.find(c => c.id === activeFilters.category)?.name}
                    <button onClick={() => setActiveFilters(prev => ({ ...prev, category: 'all' }))}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {activeFilters.origin !== 'all' && (
                  <span className="filter-tag">
                    <MapPin size={12} />
                    {activeFilters.origin}
                    <button onClick={() => setActiveFilters(prev => ({ ...prev, origin: 'all' }))}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {activeFilters.brand !== 'all' && (
                  <span className="filter-tag">
                    {activeFilters.brand}
                    <button onClick={() => setActiveFilters(prev => ({ ...prev, brand: 'all' }))}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="filter-tag">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading premium spirits...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="error-state">
                <div className="error-icon">
                  <X size={60} />
                </div>
                <h3>Oops! Something went wrong</h3>
                <p>{error}</p>
                <button 
                  className="btn-primary"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && sortedProducts.length === 0 ? (
              <div className="no-products">
                <div className="no-products-icon">
                  <Wine size={60} />
                </div>
                <h3>No spirits found</h3>
                <p>Try adjusting your filters or search criteria</p>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setActiveFilters({
                      category: 'all',
                      priceRange: 'all',
                      brand: 'all',
                      origin: 'all'
                    });
                    setSearchQuery('');
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            ) : !loading && !error ? (
              <div className={`products-grid ${viewMode}`}>
                {sortedProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className={`product-card ${hoveredProduct === product.id ? 'hovered' : ''}`}
                    style={{ '--delay': `${index * 0.08}s` }}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Glow Effect */}
                    <div className="card-glow"></div>
                    
                    {/* Badge */}
                    {product.badge && (
                      <span className={`product-badge ${product.badge.toLowerCase().replace(' ', '-')}`}>
                        <Sparkles size={12} />
                        {product.badge}
                      </span>
                    )}

                    {/* Favorite Button */}
                    <button 
                      className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(product.id);
                      }}
                    >
                      <Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                    </button>

                    {/* Image Container */}
                    <div className="product-image">
                      <div className="image-bg"></div>
                      <img src={product.image} alt={product.name} />
                      
                      {/* Floating Info on Hover */}
                      <div className="hover-info">
                        <div className="tasting-notes">
                          {product.tastingNotes.map((note, i) => (
                            <span key={i} className="note-tag">{note}</span>
                          ))}
                        </div>
                      </div>

                      {/* Quick View Button */}
                      <button 
                        className="quick-view-btn"
                        onClick={() => setShowQuickView(product)}
                      >
                        <Eye size={18} />
                        <span>Quick View</span>
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                      <div className="info-top">
                        <span className="product-brand">{product.brand}</span>
                        <span className="product-year">Est. {product.year}</span>
                      </div>
                      
                      <h3 className="product-name">
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                      </h3>
                      
                      {/* Rating */}
                      <div className="product-rating">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              fill={i < Math.floor(product.rating) ? '#D4AF37' : 'none'}
                              color="#D4AF37"
                            />
                          ))}
                        </div>
                        <span className="rating-value">{product.rating}</span>
                        <span className="reviews-count">({product.reviews} reviews)</span>
                      </div>

                      {/* Specs */}
                      <div className="product-specs">
                        <div className="spec">
                          <Droplets size={14} />
                          <span>{product.volume}</span>
                        </div>
                        <div className="spec">
                          <Wine size={14} />
                          <span>{product.alcohol}</span>
                        </div>
                        <div className="spec">
                          <MapPin size={14} />
                          <span>{product.origin}</span>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <Link to={`/products/${product.id}`} className="view-details-btn">
                        <span>Explore Details</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </main>
        </div>
      </section>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="quick-view-modal" onClick={() => setShowQuickView(null)}>
          <div className="modal-backdrop"></div>
          <div className="quick-view-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowQuickView(null)}>
              <X size={24} />
            </button>

            <div className="quick-view-grid">
              {/* Image Side */}
              <div className="qv-image-section">
                <div className="qv-image-bg"></div>
                <img src={showQuickView.image} alt={showQuickView.name} />
                
                {showQuickView.badge && (
                  <span className="qv-badge">{showQuickView.badge}</span>
                )}
              </div>

              {/* Info Side */}
              <div className="qv-info-section">
                <div className="qv-header">
                  <span className="qv-brand">{showQuickView.brand}</span>
                  <span className="qv-year">Since {showQuickView.year}</span>
                </div>
                
                <h2 className="qv-name">{showQuickView.name}</h2>
                
                <div className="qv-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        fill={i < Math.floor(showQuickView.rating) ? '#D4AF37' : 'none'}
                        color="#D4AF37"
                      />
                    ))}
                  </div>
                  <span className="rating-text">{showQuickView.rating} ({showQuickView.reviews} reviews)</span>
                </div>

                <p className="qv-description">{showQuickView.description}</p>

                {/* Tasting Notes */}
                <div className="qv-tasting">
                  <h4>Tasting Notes</h4>
                  <div className="tasting-tags">
                    {showQuickView.tastingNotes.map((note, i) => (
                      <span key={i} className="taste-tag">{note}</span>
                    ))}
                  </div>
                </div>

                {/* Specifications */}
                <div className="qv-specs">
                  <div className="spec-item">
                    <div className="spec-icon"><Droplets size={20} /></div>
                    <div className="spec-info">
                      <span className="spec-label">Volume</span>
                      <span className="spec-value">{showQuickView.volume}</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-icon"><Wine size={20} /></div>
                    <div className="spec-info">
                      <span className="spec-label">Alcohol</span>
                      <span className="spec-value">{showQuickView.alcohol}</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-icon"><MapPin size={20} /></div>
                    <div className="spec-info">
                      <span className="spec-label">Origin</span>
                      <span className="spec-value">{showQuickView.origin}</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-icon"><Award size={20} /></div>
                    <div className="spec-info">
                      <span className="spec-label">Category</span>
                      <span className="spec-value">{showQuickView.category}</span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="qv-actions">
                  <Link 
                    to={`/products/${showQuickView.id}`} 
                    className="btn-primary-large"
                  >
                    <span>View Full Details</span>
                    <ArrowRight size={20} />
                  </Link>
                  <button 
                    className={`btn-favorite ${favorites.includes(showQuickView.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(showQuickView.id)}
                  >
                    <Heart size={20} fill={favorites.includes(showQuickView.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;