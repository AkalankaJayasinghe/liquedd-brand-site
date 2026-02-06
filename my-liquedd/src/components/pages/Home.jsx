import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Menu, ChevronLeft, ChevronRight, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // --- HERO VIDEO & EXISTING LOGIC ---
  const heroVideos = [
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1920', // Perfume bottles
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1920', // Luxury perfume
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1920', // Fragrance collection
  ];
  const [currentVideo, setCurrentVideo] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);
  const [cartCount, setCartCount] = useState(2);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sliderRef = useRef(null); 
  const productSliderRef = useRef(null);
  const brandSliderRef = useRef(null);

  // Video Auto Change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideo((prevIndex) => (prevIndex + 1) % heroVideos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroVideos.length]);

  // Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto Slide for Cellar
  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      if (sliderRef.current) {
        const { current } = sliderRef;
        const isAtEnd = current.scrollLeft + current.clientWidth >= current.scrollWidth - 10;
        if (isAtEnd) current.scrollTo({ left: 0, behavior: 'smooth' });
        else current.scrollBy({ left: 400, behavior: 'smooth' });
      }
    }, 4000);
    return () => clearInterval(autoSlideInterval);
  }, []);

  // Auto Slide for Brands
  useEffect(() => {
    const brandInterval = setInterval(() => {
      if (brandSliderRef.current) {
        const { current } = brandSliderRef;
        const isAtEnd = current.scrollLeft + current.clientWidth >= current.scrollWidth - 10;
        if (isAtEnd) {
          current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          current.scrollBy({ left: 200, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(brandInterval);
  }, []);

  const slideProducts = (direction) => {
    if (productSliderRef.current) {
      const { current } = productSliderRef;
      const scrollAmount = direction === 'left' ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleLike = (productId) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    // Add cart animation trigger here
    const cartElement = document.querySelector('.cart-wrapper');
    cartElement.classList.add('cart-bounce');
    setTimeout(() => cartElement.classList.remove('cart-bounce'), 600);
  };

  // --- DATA ---
  const products = [
    { id: 1, name: "William Lawsons Scotch", price: "LKR 7,700.00", image: "https://www.wineworld.lk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/i/william_lawsons_750ml.jpg", badge: "Popular" },
    { id: 2, name: "Absolut Elyx", price: "LKR 28,900.00", image: "https://www.wineworld.lk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/b/absolut_elyx_750ml.jpg", badge: "Premium" },
    { id: 3, name: "Vat 69, 750ml", price: "LKR 7,500.00", image: "https://www.wineworld.lk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/v/a/vat_69_750ml.jpg" },
    { id: 4, name: "Rockland Red Rum", price: "LKR 8,500.00", image: "https://rockland.lk/wp-content/uploads/2021/08/Rockland-Red-Rum-750ml.png", badge: "New" },
    { id: 5, name: "Johnnie Walker Blonde", price: "LKR 14,400.00", image: "https://www.wineworld.lk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/j/o/johnnie_walker_blonde_750ml.jpg" },
    { id: 6, name: "Belvedere Pure Vodka", price: "LKR 199,000.00", image: "https://cdn.shopify.com/s/files/1/0013/2477/7569/products/Belvedere-Pure_1024x1024.jpg", badge: "Luxury" },
  ];

  const categories = [
    { name: "Premium Arrack", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600", count: "24 Products" },
    { name: "Craft Gin", image: "https://images.unsplash.com/photo-1598155523122-38423bd4d6bc?w=600", count: "18 Products" },
    { name: "Aged Rum", image: "https://images.unsplash.com/photo-1619451427882-6aaaded0cc61?w=600", count: "32 Products" },
    { name: "Single Malt", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600", count: "41 Products" },
    { name: "Fine Wine", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600", count: "56 Products" }
  ];

  // Simpler brand array with focus on text
  const brands = [
    { id: "rockland", name: "ROCKLAND" },
    { id: "dcsl", name: "DCSL" },
    { id: "johnnie-walker", name: "JOHNNIE WALKER" },
    { id: "absolut", name: "ABSOLUT" },
    { id: "hennessy", name: "HENNESSY" },
    { id: "chivas", name: "CHIVAS REGAL" },
    { id: "bacardi", name: "BACARDÍ" },
    { id: "smirnoff", name: "SMIRNOFF" },
    { id: "jack-daniels", name: "JACK DANIEL'S" },
    { id: "grey-goose", name: "GREY GOOSE" },
    { id: "moet-chandon", name: "MOËT & CHANDON" },
    { id: "patron", name: "PATRÓN" }
  ];

  return (
    <div className="home-container">
      {/* Enhanced Navbar with Scroll Effect */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-left">
          <Menu className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} />
          <span className="brand-year">EST. 1924</span>
        </div>
        <div className="nav-center">
          <h1 className="logo-text">CEYLON <span className="logo-accent">SPIRITS</span></h1>
        </div>
        <div className="nav-right">
          <Search className="nav-icon" />
          <div className="cart-wrapper">
            <ShoppingCart className="nav-icon" />
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Progress Indicators */}
      <header className="hero-section">
        <div className="hero-video-container">
          {heroVideos.map((video, index) => (
            <video
              key={index} src={video} autoPlay muted loop playsInline
              poster="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1920"
              className={`hero-video ${index === currentVideo ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content animate-fade-in">
          <span className="hero-tagline">GUARDIAN OF THE ISLAND SPIRIT</span>
          <h2 className="hero-title">Experience the Legacy of <br/>Ceylon Arrack</h2>
          <p className="hero-desc">Handcrafted from the finest coconut flower nectar.</p>
          <div className="hero-actions">
            <Link to="/shop" className="btn-gold">Shop Collection</Link>
            <Link to="/our-story" className="btn-outline">Our Heritage</Link>
          </div>
        </div>
        
        {/* Video Progress Indicators */}
        <div className="video-indicators">
          {heroVideos.map((_, index) => (
            <div 
              key={index} 
              className={`indicator ${index === currentVideo ? 'active' : ''}`}
              onClick={() => setCurrentVideo(index)}
            />
          ))}
        </div>
      </header>

      {/* Enhanced Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h3>Explore Our Cellar</h3>
          <div className="separator"></div>
        </div>
        <div className="slider-wrapper">
          <div className="category-slider" ref={sliderRef}>
            {categories.map((cat, index) => (
              <div 
                key={index} 
                className={`category-card-slide ${activeCategory === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveCategory(index)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <img src={cat.image} alt={cat.name} />
                <div className="category-overlay">
                  <span className="category-count">{cat.count}</span>
                  <h4>{cat.name}</h4>
                  <Link to={`/shop/${cat.name.toLowerCase()}`} className="cat-link">
                    View Range <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products with More Interactions */}
      <section className="featured-shop">
        <div className="shop-header-full">
          <h3>Trending Now</h3>
          <Link to="/shop" className="view-all-btn">VIEW MORE</Link>
        </div>
        <div className="product-slider-wrapper-full">
          <button className="prod-nav-btn left" onClick={() => slideProducts('left')}>
            <ChevronLeft size={24} />
          </button>
          <div className="product-slider-full" ref={productSliderRef}>
            {products.map((product) => (
              <div key={product.id} className="product-card-clean">
                {product.badge && (
                  <span className={`product-badge ${product.badge.toLowerCase()}`}>
                    {product.badge}
                  </span>
                )}
                <div className="product-img-wrap">
                  <img src={product.image} alt={product.name} />
                  <div className="product-actions-overlay">
                    <button 
                      className={`action-btn ${likedProducts.includes(product.id) ? 'liked' : ''}`}
                      onClick={() => toggleLike(product.id)}
                      title="Add to wishlist"
                    >
                      <Heart size={20} fill={likedProducts.includes(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <Link to={`/product/${product.id}`} className="action-btn" title="Quick view">
                      <Eye size={20} />
                    </Link>
                  </div>
                </div>
                <div className="product-details-clean">
                  <h4 className="prod-title">{product.name}</h4>
                  <p className="prod-price">{product.price}</p>
                  <div className="product-buttons">
                    <Link to={`/product/${product.id}`} className="btn-view-only">View Details</Link>
                    <button 
                      className="btn-add-cart"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="prod-nav-btn right" onClick={() => slideProducts('right')}>
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Enhanced Heritage Section with Parallax Effect */}
      <section className="heritage-teaser">
        <div className="heritage-content">
          <div className="heritage-text">
            <span className="sub-heading">SINCE 1924</span>
            <h2>The Art of Distillation</h2>
            <p>In the heart of Sri Lanka, we continue a tradition that began over four generations ago. Every bottle tells a story of craftsmanship, dedication, and the perfect blend of tradition and innovation.</p>
            <Link to="/about" className="link-underline">Discover Our Story →</Link>
          </div>
          <div className="heritage-img-box">
            <div className="img-frame">
              <img src="https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?w=600" alt="Old Distillery" />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Brand Section */}
      <section className="brand-section">
        <div className="brand-header">
          <h3>Our Premium Partners</h3>
          <p className="brand-subtext">Curated selection from the world's finest distilleries</p>
        </div>
        <div className="brand-slider-text" ref={brandSliderRef}>
          {brands.map((brand) => (
            <Link to={`/brands/${brand.id}`} key={brand.id} className="brand-text-item">
              <span>{brand.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h3>Join Our Exclusive Circle</h3>
          <p>Be the first to know about new arrivals, special offers, and exclusive events.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;