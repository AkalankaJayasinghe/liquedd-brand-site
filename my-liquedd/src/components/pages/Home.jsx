import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // --- HERO VIDEO & EXISTING LOGIC (No Changes) ---
  const heroVideos = [
    "https://videos.pexels.com/video-files/855078/855078-hd_1920_1080_30fps.mp4",
    "https://videos.pexels.com/video-files/4276709/4276709-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/6063467/6063467-hd_1920_1080_25fps.mp4"
  ];
  const [currentVideo, setCurrentVideo] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideo((prevIndex) => (prevIndex + 1) % heroVideos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroVideos.length]);

  const sliderRef = useRef(null); 
  const productSliderRef = useRef(null);
  
  // --- 1. NEW BRAND SLIDER REF ---
  const brandSliderRef = useRef(null);

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

  // --- 2. AUTO SLIDE FOR BRANDS ---
  useEffect(() => {
    const brandInterval = setInterval(() => {
      if (brandSliderRef.current) {
        const { current } = brandSliderRef;
        const isAtEnd = current.scrollLeft + current.clientWidth >= current.scrollWidth - 10;
        if (isAtEnd) {
          current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          current.scrollBy({ left: 200, behavior: 'smooth' }); // හෙමින් slide වෙන්න
        }
      }
    }, 3000); // තත්පර 3කට සැරයක්
    return () => clearInterval(brandInterval);
  }, []);

  const slideProducts = (direction) => {
    if (productSliderRef.current) {
      const { current } = productSliderRef;
      const scrollAmount = direction === 'left' ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // --- DATA ---
  const products = [
    { id: 1, name: "William Lawsons Scotch", price: "LKR 7,700.00", image: "https://www.wineworld.lk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/i/william_lawsons_750ml.jpg" },
    { id: 2, name: "Absolut Elyx", price: "LKR 28,900.00", image: "https://www.wineworld.lk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/b/absolut_elyx_750ml.jpg" },
    { id: 3, name: "Vat 69, 750ml", price: "LKR 7,500.00", image: "https://www.wineworld.lk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/v/a/vat_69_750ml.jpg" },
    { id: 4, name: "Rockland Red Rum", price: "LKR 8,500.00", image: "https://rockland.lk/wp-content/uploads/2021/08/Rockland-Red-Rum-750ml.png" },
    { id: 5, name: "Johnnie Walker Blonde", price: "LKR 14,400.00", image: "https://www.wineworld.lk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/j/o/johnnie_walker_blonde_750ml.jpg" },
    { id: 6, name: "Belvedere Pure Vodka", price: "LKR 199,000.00", image: "https://cdn.shopify.com/s/files/1/0013/2477/7569/products/Belvedere-Pure_1024x1024.jpg" },
  ];

  const categories = [
    { name: "Premium Arrack", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600" },
    { name: "Craft Gin", image: "https://images.unsplash.com/photo-1598155523122-38423bd4d6bc?w=600" },
    { name: "Aged Rum", image: "https://images.unsplash.com/photo-1619451427882-6aaaded0cc61?w=600" },
    { name: "Single Malt", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600" },
    { name: "Fine Wine", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600" }
  ];

  // --- 3. BRAND DATA ---
  const brands = [
    { id: "rockland", name: "Rockland", logo: "https://rockland.lk/wp-content/uploads/2021/04/Rockland-Logo.png" },
    { id: "dcsl", name: "DCSL", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Distilleries_Company_of_Sri_Lanka_logo.svg/1200px-Distilleries_Company_of_Sri_Lanka_logo.svg.png" },
    { id: "johnnie-walker", name: "Johnnie Walker", logo: "https://logos-world.net/wp-content/uploads/2020/09/Johnnie-Walker-Logo.png" },
    { id: "absolut", name: "Absolut", logo: "https://logos-world.net/wp-content/uploads/2020/12/Absolut-Logo.png" },
    { id: "hennessy", name: "Hennessy", logo: "https://logos-world.net/wp-content/uploads/2020/12/Hennessy-Logo.png" },
    { id: "chivas", name: "Chivas", logo: "https://logos-world.net/wp-content/uploads/2020/12/Chivas-Regal-Logo.png" },
    { id: "bacardi", name: "Bacardi", logo: "https://logos-world.net/wp-content/uploads/2020/12/Bacardi-Logo.png" },
    { id: "smirnoff", name: "Smirnoff", logo: "https://logos-world.net/wp-content/uploads/2020/04/Smirnoff-Logo.png" },
    { id: "jack-daniels", name: "Jack Daniel's", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Jack_Daniel%27s_logo.svg/1200px-Jack_Daniel%27s_logo.svg.png" },
    { id: "grey-goose", name: "Grey Goose", logo: "https://logowik.com/content/uploads/images/grey-goose-vodka-new3122.jpg" },
    { id: "moet-chandon", name: "Moët & Chandon", logo: "https://1000logos.net/wp-content/uploads/2020/09/Moet-Chandon-Logo.png" },
    { id: "patron", name: "Patrón", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Patr%C3%B3n_Logo.svg/1200px-Patr%C3%B3n_Logo.svg.png" }
  ];

  return (
    <div className="home-container">
      {/* Navbar & Hero ... (Same code) */}
      <nav className="navbar">
        <div className="nav-left">
          <Menu className="menu-icon" />
          <span className="brand-year">EST. 1924</span>
        </div>
        <div className="nav-center">
          <h1 className="logo-text">CEYLON <span className="logo-accent">SPIRITS</span></h1>
        </div>
        <div className="nav-right">
          <Search className="nav-icon" />
          <div className="cart-wrapper">
            <ShoppingCart className="nav-icon" />
            <span className="cart-count">2</span>
          </div>
        </div>
      </nav>

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
        <div className="hero-content">
          <span className="hero-tagline">GUARDIAN OF THE ISLAND SPIRIT</span>
          <h2 className="hero-title">Experience the Legacy of <br/>Ceylon Arrack</h2>
          <p className="hero-desc">Handcrafted from the finest coconut flower nectar.</p>
          <div className="hero-actions">
            <Link to="/shop" className="btn-gold">Shop Collection</Link>
            <Link to="/our-story" className="btn-outline">Our Heritage</Link>
          </div>
        </div>
      </header>

      <section className="categories-section">
        <div className="section-header">
          <h3>Explore Our Cellar</h3>
          <div className="separator"></div>
        </div>
        <div className="slider-wrapper">
          <div className="category-slider" ref={sliderRef}>
            {categories.map((cat, index) => (
              <div key={index} className="category-card-slide">
                <img src={cat.image} alt={cat.name} />
                <div className="category-overlay">
                  <h4>{cat.name}</h4>
                  <Link to={`/shop/${cat.name.toLowerCase()}`} className="cat-link">View Range</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-shop">
        <div className="shop-header-full">
          <h3>Trending Now</h3>
          <Link to="/shop" className="view-all-btn">VIEW MORE</Link>
        </div>
        <div className="product-slider-wrapper-full">
          <button className="prod-nav-btn left" onClick={() => slideProducts('left')}><ChevronLeft size={24} /></button>
          <div className="product-slider-full" ref={productSliderRef}>
            {products.map((product) => (
              <div key={product.id} className="product-card-clean">
                <div className="product-img-wrap">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-details-clean">
                  <h4 className="prod-title">{product.name}</h4>
                  <p className="prod-price">{product.price}</p>
                  <Link to={`/product/${product.id}`} className="btn-view-only">View</Link>
                </div>
              </div>
            ))}
          </div>
          <button className="prod-nav-btn right" onClick={() => slideProducts('right')}><ChevronRight size={24} /></button>
        </div>
      </section>

      <section className="heritage-teaser">
        <div className="heritage-content">
          <div className="heritage-text">
            <span className="sub-heading">SINCE 1924</span>
            <h2>The Art of Distillation</h2>
            <p>In the heart of Sri Lanka, we continue a tradition that began over four generations ago.</p>
            <Link to="/about" className="link-underline">Discover Our Story</Link>
          </div>
          <div className="heritage-img-box">
             <div className="img-frame"><img src="https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?w=600" alt="Old Distillery" /></div>
          </div>
        </div>
      </section>

      {/* --- 4. NEW BRANDS SECTION --- */}
      <section className="brand-section">
        <div className="brand-header">
            <h3>Our Premium Partners</h3>
        </div>
        <div className="brand-slider" ref={brandSliderRef}>
            {brands.map((brand) => (
                // Click කළාම /brands/rockland වගේ තැනකට යන්න Link එකක් දැම්මා
                <Link to={`/brands/${brand.id}`} key={brand.id} className="brand-item">
                    <img src={brand.logo} alt={brand.name} />
                </Link>
            ))}
        </div>
      </section>

    </div>
  );
};

export default Home;