import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, Leaf, Users, Globe, ChevronDown, Play, Pause,
  MapPin, Phone, Mail, ArrowRight, Star, Target, Eye,
  Clock, CheckCircle, Sparkles
} from 'lucide-react';
import './About.css';

const About = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [stats, setStats] = useState({ years: 0, products: 0, customers: 0, awards: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const videoRef = useRef(null);
  const statsRef = useRef(null);

  // --- SCROLL ANIMATIONS ---
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

  // --- COUNTER ANIMATION ---
  useEffect(() => {
    const animateCounter = (target, key, duration = 2000) => {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        setStats(prev => ({ ...prev, [key]: current }));
        
        if (progress >= 1) clearInterval(timer);
      }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(99, 'years');
          animateCounter(500, 'products');
          animateCounter(50000, 'customers');
          animateCounter(25, 'awards');
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // --- PARALLAX MOUSE EFFECT ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- VIDEO CONTROL ---
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // --- DATA ---
  const values = [
    {
      icon: <Leaf size={32} />,
      title: "Natural Excellence",
      description: "We source only the finest natural ingredients, ensuring every drop reflects our commitment to purity and authenticity.",
      color: "#4CAF50"
    },
    {
      icon: <Target size={32} />,
      title: "Precision Craft",
      description: "Our master distillers combine centuries-old techniques with modern innovation to create spirits of unparalleled quality.",
      color: "#D4AF37"
    },
    {
      icon: <Users size={32} />,
      title: "Community Heritage",
      description: "We're deeply rooted in Sri Lankan tradition, supporting local farmers and preserving cultural craftsmanship.",
      color: "#2196F3"
    },
    {
      icon: <Globe size={32} />,
      title: "Global Standards",
      description: "While honoring our heritage, we meet international quality standards, bringing Ceylon's finest to the world.",
      color: "#9C27B0"
    }
  ];

  const timeline = [
    {
      year: "1924",
      title: "The Foundation",
      description: "Our founder, James Ceylon, established the first distillery in the heart of Sri Lanka's coconut country.",
      image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600"
    },
    {
      year: "1952",
      title: "Mastering the Craft",
      description: "Second generation takes over, perfecting the traditional arrack distillation process.",
      image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600"
    },
    {
      year: "1978",
      title: "International Recognition",
      description: "Won our first international spirit award, putting Ceylon Arrack on the global map.",
      image: "https://images.unsplash.com/photo-1574610758891-5b809f8881c7?w=600"
    },
    {
      year: "1995",
      title: "Expanding Horizons",
      description: "Launched premium gin and rum lines, diversifying our portfolio while maintaining quality.",
      image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600"
    },
    {
      year: "2010",
      title: "Sustainability Commitment",
      description: "Implemented eco-friendly practices and sustainable sourcing throughout our operations.",
      image: "https://images.unsplash.com/photo-1605989991368-9c6a99d67e99?w=600"
    },
    {
      year: "2024",
      title: "A Century of Excellence",
      description: "Celebrating 100 years of crafting the finest spirits, now available worldwide through our digital platform.",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600"
    }
  ];

  const team = [
    {
      name: "Rajitha Fernando",
      role: "Master Distiller",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      bio: "Third-generation distiller with 35 years of experience crafting award-winning spirits.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Amara Perera",
      role: "CEO & Visionary",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      bio: "Leading Ceylon Spirits into the future while honoring our century-old traditions.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Marcus De Silva",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      bio: "Ensures seamless production and distribution across our global network.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Kavindi Jayawardena",
      role: "Quality Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      bio: "Guardian of our quality standards, ensuring every bottle meets perfection.",
      social: { linkedin: "#", twitter: "#" }
    }
  ];

  const awards = [
    { year: "2023", title: "World Spirits Award Gold", org: "International Spirits Competition" },
    { year: "2022", title: "Best Asian Arrack", org: "Asian Spirits Masters" },
    { year: "2021", title: "Sustainability Excellence", org: "Green Business Awards" },
    { year: "2020", title: "Heritage Brand of the Year", org: "Sri Lanka Business Awards" }
  ];

  const scrollToContent = () => {
    document.querySelector('.story-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="about-page">
      {/* FLOATING PARTICLES */}
      <div className="particles">
        {particles}
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="about-hero">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1920"
        >
          <source src="https://videos.pexels.com/video-files/5527906/5527906-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        
        <div className="hero-overlay"></div>
        
        <div className="hero-content" style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
        }}>
          <span className="hero-badge animate-fade-in">
            <Sparkles size={16} /> EST. 1924 — A CENTURY OF EXCELLENCE
          </span>
          
          <h1 className="hero-title animate-fade-in delay-1">
            The Spirit of <span className="text-gold">Ceylon</span>
          </h1>
          
          <p className="hero-description animate-fade-in delay-2">
            For 100 years, we've been crafting the finest spirits from the heart of Sri Lanka. 
            Our legacy is built on passion, precision, and an unwavering commitment to excellence.
          </p>
          
          <div className="hero-actions animate-fade-in delay-3">
            <Link to="/shop" className="btn-primary">
              Explore Collection <ArrowRight size={18} />
            </Link>
            <button className="btn-video" onClick={toggleVideo}>
              {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isVideoPlaying ? 'Pause' : 'Play'} Video
            </button>
          </div>
        </div>
        
        <button className="scroll-indicator" onClick={scrollToContent}>
          <span>Discover Our Story</span>
          <ChevronDown size={24} className="bounce" />
        </button>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon"><Clock size={28} /></div>
            <h3 className="stat-number">{stats.years}</h3>
            <p className="stat-label">Years of Legacy</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Award size={28} /></div>
            <h3 className="stat-number">{stats.products}+</h3>
            <p className="stat-label">Premium Products</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Users size={28} /></div>
            <h3 className="stat-number">{stats.customers.toLocaleString()}+</h3>
            <p className="stat-label">Happy Customers</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Star size={28} /></div>
            <h3 className="stat-number">{stats.awards}</h3>
            <p className="stat-label">Global Awards</p>
          </div>
        </div>
      </section>

      {/* ==================== STORY SECTION ==================== */}
      <section className="story-section animate-on-scroll">
        <div className="story-container">
          <div className="story-images">
            <div className="image-stack">
              <img 
                src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600" 
                alt="Traditional Distillery" 
                className="story-img-1"
              />
              <img 
                src="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600" 
                alt="Copper Stills" 
                className="story-img-2"
              />
              <div className="experience-badge">
                <span className="exp-number">100</span>
                <span className="exp-text">Years of<br/>Excellence</span>
              </div>
            </div>
          </div>
          
          <div className="story-content">
            <span className="section-label">OUR STORY</span>
            <h2 className="section-title">
              A Legacy Forged in <span className="text-gold">Tradition</span>
            </h2>
            
            <div className="story-text">
              <p>
                In 1924, our founder James Ceylon had a vision: to create spirits that would 
                capture the essence of Sri Lanka's rich natural heritage. Starting with a 
                single copper still and the finest coconut flower nectar, he began a journey 
                that would span generations.
              </p>
              <p>
                Today, Ceylon Spirits stands as a testament to that vision. We honor our 
                heritage while embracing innovation, ensuring every bottle tells the story 
                of our island's beauty and our craftsmen's dedication.
              </p>
              <p>
                From the lush coconut groves of the southern coast to the refined distilleries 
                where magic happens, every step of our process reflects a century of 
                accumulated wisdom and passion.
              </p>
            </div>
            
            <div className="story-features">
              <div className="feature">
                <CheckCircle size={20} className="text-gold" />
                <span>100% Natural Ingredients</span>
              </div>
              <div className="feature">
                <CheckCircle size={20} className="text-gold" />
                <span>Traditional Craftsmanship</span>
              </div>
              <div className="feature">
                <CheckCircle size={20} className="text-gold" />
                <span>Sustainable Practices</span>
              </div>
            </div>
            
            <Link to="/heritage" className="link-arrow">
              Explore Our Heritage <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== MISSION & VISION ==================== */}
      <section className="mission-vision-section animate-on-scroll">
        <div className="mv-container">
          <div className="mv-card mission-card">
            <div className="mv-icon-wrap">
              <Target size={40} />
            </div>
            <h3>Our Mission</h3>
            <p>
              To craft exceptional spirits that honor Sri Lanka's heritage while 
              exceeding global standards of quality. We aim to be the ambassador 
              of Ceylon's finest traditions, one bottle at a time.
            </p>
            <div className="mv-decoration"></div>
          </div>
          
          <div className="mv-divider">
            <div className="divider-line"></div>
            <div className="divider-icon">
              <Sparkles size={24} />
            </div>
            <div className="divider-line"></div>
          </div>
          
          <div className="mv-card vision-card">
            <div className="mv-icon-wrap">
              <Eye size={40} />
            </div>
            <h3>Our Vision</h3>
            <p>
              To be recognized globally as the premier producer of artisanal 
              spirits from South Asia, setting the benchmark for quality, 
              sustainability, and cultural authenticity in the spirits industry.
            </p>
            <div className="mv-decoration"></div>
          </div>
        </div>
      </section>

      {/* ==================== VALUES SECTION ==================== */}
      <section className="values-section animate-on-scroll">
        <div className="section-header">
          <span className="section-label">OUR VALUES</span>
          <h2 className="section-title">
            The Pillars of Our <span className="text-gold">Excellence</span>
          </h2>
          <p className="section-subtitle">
            These core principles guide every decision we make and every spirit we craft.
          </p>
        </div>
        
        <div className="values-grid">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="value-card"
              style={{ '--accent-color': value.color }}
            >
              <div className="value-icon" style={{ color: value.color }}>
                {value.icon}
              </div>
              <h4>{value.title}</h4>
              <p>{value.description}</p>
              <div className="value-number">0{index + 1}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== TIMELINE SECTION ==================== */}
      <section className="timeline-section animate-on-scroll">
        <div className="section-header">
          <span className="section-label">OUR JOURNEY</span>
          <h2 className="section-title">
            100 Years of <span className="text-gold">History</span>
          </h2>
        </div>
        
        <div className="timeline-wrapper">
          <div className="timeline-nav">
            {timeline.map((item, index) => (
              <button
                key={index}
                className={`timeline-nav-item ${activeTimeline === index ? 'active' : ''}`}
                onClick={() => setActiveTimeline(index)}
              >
                <span className="nav-year">{item.year}</span>
                <span className="nav-dot"></span>
              </button>
            ))}
            <div className="timeline-line"></div>
          </div>
          
          <div className="timeline-content">
            <div className="timeline-image">
              <img 
                src={timeline[activeTimeline].image} 
                alt={timeline[activeTimeline].title}
                key={activeTimeline}
              />
              <div className="image-year">{timeline[activeTimeline].year}</div>
            </div>
            
            <div className="timeline-details">
              <h3>{timeline[activeTimeline].title}</h3>
              <p>{timeline[activeTimeline].description}</p>
              <div className="timeline-progress">
                <div 
                  className="progress-bar"
                  style={{ width: `${((activeTimeline + 1) / timeline.length) * 100}%` }}
                ></div>
              </div>
              <span className="progress-text">
                {activeTimeline + 1} of {timeline.length} milestones
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TEAM SECTION ==================== */}
      <section className="team-section animate-on-scroll">
        <div className="section-header">
          <span className="section-label">THE PEOPLE</span>
          <h2 className="section-title">
            Meet Our <span className="text-gold">Masters</span>
          </h2>
          <p className="section-subtitle">
            The passionate individuals who bring our vision to life every day.
          </p>
        </div>
        
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
                <div className="member-overlay">
                  <p>{member.bio}</p>
                </div>
              </div>
              <div className="member-info">
                <h4>{member.name}</h4>
                <p className="member-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== AWARDS SECTION ==================== */}
      <section className="awards-section animate-on-scroll">
        <div className="awards-bg"></div>
        <div className="awards-container">
          <div className="awards-content">
            <span className="section-label">RECOGNITION</span>
            <h2 className="section-title">
              Award-Winning <span className="text-gold">Excellence</span>
            </h2>
            <p>
              Our commitment to quality has been recognized by prestigious 
              international bodies, affirming our position among the world's finest.
            </p>
          </div>
          
          <div className="awards-list">
            {awards.map((award, index) => (
              <div key={index} className="award-item">
                <div className="award-year">{award.year}</div>
                <div className="award-details">
                  <h4>{award.title}</h4>
                  <p>{award.org}</p>
                </div>
                <Award size={24} className="award-icon" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROCESS SECTION ==================== */}
      <section className="process-section animate-on-scroll">
        <div className="section-header">
          <span className="section-label">THE CRAFT</span>
          <h2 className="section-title">
            Our Distillation <span className="text-gold">Process</span>
          </h2>
        </div>
        
        <div className="process-grid">
          <div className="process-step">
            <div className="step-number">01</div>
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1591457558976-4d1f30e8-7a7a?w=400" alt="Harvesting" />
            </div>
            <h4>Harvesting</h4>
            <p>Hand-picked coconut flower nectar collected at dawn for optimal sweetness.</p>
          </div>
          
          <div className="process-step">
            <div className="step-number">02</div>
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400" alt="Fermentation" />
            </div>
            <h4>Fermentation</h4>
            <p>Natural fermentation in traditional clay pots for 48-72 hours.</p>
          </div>
          
          <div className="process-step">
            <div className="step-number">03</div>
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400" alt="Distillation" />
            </div>
            <h4>Distillation</h4>
            <p>Double distillation in copper pot stills for purity and character.</p>
          </div>
          
          <div className="process-step">
            <div className="step-number">04</div>
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400" alt="Aging" />
            </div>
            <h4>Aging</h4>
            <p>Matured in Halmilla wood barrels, developing complex flavors.</p>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="cta-section">
        <div className="cta-bg">
          <video autoPlay muted loop playsInline>
            <source src="https://videos.pexels.com/video-files/855078/855078-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="cta-overlay"></div>
        
        <div className="cta-content">
          <h2>Experience the Legacy</h2>
          <p>
            Join us on a journey through a century of craftsmanship. 
            Discover the spirit of Ceylon in every sip.
          </p>
          <div className="cta-actions">
            <Link to="/shop" className="btn-primary">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-outline">
              <MapPin size={18} /> Visit Our Distillery
            </Link>
          </div>
          
          <div className="cta-contact">
            <a href="tel:+94112345678"><Phone size={16} /> +94 11 234 5678</a>
            <a href="mailto:info@ceylonspirits.com"><Mail size={16} /> info@ceylonspirits.com</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;