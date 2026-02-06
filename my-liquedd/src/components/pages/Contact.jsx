import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Clock, Send, ChevronDown, ChevronUp,
  MessageCircle, Users, Building, Headphones, Instagram, 
  Facebook, Twitter, Linkedin, Youtube, ArrowRight, CheckCircle,
  AlertCircle, Loader, Sparkles, Globe, Award
} from 'lucide-react';
import './Contact.css';

const Contact = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  // FAQ State
  const [activeFaq, setActiveFaq] = useState(null);

  // Animation States
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  
  const formRef = useRef(null);

  // --- SCROLL ANIMATIONS ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
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

  // --- MOUSE PARALLAX ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- FORM VALIDATION ---
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';
      case 'phone':
        if (value && !/^[\d\s\-\+\(\)]{10,}$/.test(value)) return 'Invalid phone number';
        return '';
      case 'subject':
        if (!value) return 'Please select a subject';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setFocusedField(null);
  };

  const handleFocus = (e) => {
    setFocusedField(e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Shake animation for form
      formRef.current?.classList.add('shake');
      setTimeout(() => formRef.current?.classList.remove('shake'), 500);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- DATA ---
  const contactCards = [
    {
      icon: <MapPin size={28} />,
      title: "Visit Our Distillery",
      details: ["Ceylon Spirits Estate", "42 Palm Grove Road", "Kalutara, Sri Lanka"],
      action: { text: "Get Directions", link: "#map" },
      color: "#4CAF50"
    },
    {
      icon: <Phone size={28} />,
      title: "Call Us",
      details: ["+94 11 234 5678", "+94 77 123 4567", "Toll Free: 1-800-CEYLON"],
      action: { text: "Call Now", link: "tel:+94112345678" },
      color: "#2196F3"
    },
    {
      icon: <Mail size={28} />,
      title: "Email Us",
      details: ["info@ceylonspirits.com", "orders@ceylonspirits.com", "support@ceylonspirits.com"],
      action: { text: "Send Email", link: "mailto:info@ceylonspirits.com" },
      color: "#9C27B0"
    },
    {
      icon: <Clock size={28} />,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"],
      action: { text: "Book a Tour", link: "/tours" },
      color: "#FF9800"
    }
  ];

  const subjectOptions = [
    { value: '', label: 'Select a subject', icon: null },
    { value: 'general', label: 'General Inquiry', icon: <MessageCircle size={16} /> },
    { value: 'orders', label: 'Order Support', icon: <Building size={16} /> },
    { value: 'wholesale', label: 'Wholesale & Partnership', icon: <Users size={16} /> },
    { value: 'tours', label: 'Distillery Tours', icon: <Globe size={16} /> },
    { value: 'feedback', label: 'Feedback & Suggestions', icon: <Award size={16} /> },
    { value: 'support', label: 'Technical Support', icon: <Headphones size={16} /> }
  ];

  const faqs = [
    {
      question: "What are your delivery options?",
      answer: "We offer island-wide delivery within Sri Lanka (2-3 business days) and international shipping to select countries (7-14 business days). Free delivery on orders above LKR 15,000."
    },
    {
      question: "Can I visit your distillery?",
      answer: "Absolutely! We offer guided tours of our heritage distillery every Saturday and Sunday. Tours include a walkthrough of our production process, history, and a tasting session. Book in advance to secure your spot."
    },
    {
      question: "Do you offer bulk or corporate orders?",
      answer: "Yes, we provide special pricing for bulk orders and corporate gifting. Contact our wholesale team for customized quotes, branded packaging options, and exclusive corporate discounts."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 7 days of delivery for unopened products in original packaging. For damaged or defective items, please contact us within 48 hours of receiving your order with photos."
    },
    {
      question: "Are your products available internationally?",
      answer: "Currently, we ship to select countries including UAE, UK, USA, Australia, and Singapore. Check our shipping page for the complete list and applicable duties/taxes for your region."
    },
    {
      question: "How can I become a retail partner?",
      answer: "We're always looking to expand our retail network. Please fill out the contact form with 'Wholesale & Partnership' as the subject, and our business development team will reach out within 2 business days."
    }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: <Instagram size={22} />, url: 'https://instagram.com', color: '#E4405F', followers: '45K' },
    { name: 'Facebook', icon: <Facebook size={22} />, url: 'https://facebook.com', color: '#1877F2', followers: '32K' },
    { name: 'Twitter', icon: <Twitter size={22} />, url: 'https://twitter.com', color: '#1DA1F2', followers: '18K' },
    { name: 'LinkedIn', icon: <Linkedin size={22} />, url: 'https://linkedin.com', color: '#0A66C2', followers: '12K' },
    { name: 'YouTube', icon: <Youtube size={22} />, url: 'https://youtube.com', color: '#FF0000', followers: '28K' }
  ];

  const stats = [
    { number: '24/7', label: 'Customer Support' },
    { number: '<2hrs', label: 'Response Time' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '50+', label: 'Countries Served' }
  ];

  return (
    <div className="contact-page">
      {/* FLOATING PARTICLES */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }} />
        ))}
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="contact-hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920"
        >
          <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        
        <div className="hero-overlay"></div>
        
        <div className="hero-content" style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
        }}>
          <span className="hero-badge animate-fade-in">
            <Sparkles size={16} /> WE'D LOVE TO HEAR FROM YOU
          </span>
          
          <h1 className="hero-title animate-fade-in delay-1">
            Get in <span className="text-gold">Touch</span>
          </h1>
          
          <p className="hero-description animate-fade-in delay-2">
            Have questions about our spirits, need assistance with an order, 
            or interested in partnership opportunities? We're here to help.
          </p>

          <div className="hero-stats animate-fade-in delay-3">
            {stats.map((stat, index) => (
              <div key={index} className="hero-stat">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <ChevronDown className="bounce" size={24} />
        </div>
      </section>

      {/* ==================== CONTACT CARDS ==================== */}
      <section className="contact-cards-section animate-on-scroll" id="cards">
        <div className="cards-container">
          {contactCards.map((card, index) => (
            <div 
              key={index} 
              className="contact-card"
              style={{ '--card-color': card.color, '--delay': `${index * 0.1}s` }}
            >
              <div className="card-icon" style={{ color: card.color }}>
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <div className="card-details">
                {card.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>
              <a href={card.action.link} className="card-action">
                {card.action.text} <ArrowRight size={16} />
              </a>
              <div className="card-glow" style={{ background: card.color }}></div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <section className="contact-main animate-on-scroll" id="main">
        <div className="contact-container">
          
          {/* CONTACT FORM */}
          <div className="form-section">
            <div className="form-header">
              <span className="section-label">SEND A MESSAGE</span>
              <h2>Let's Start a <span className="text-gold">Conversation</span></h2>
              <p>Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>

            <form 
              ref={formRef}
              className={`contact-form ${submitStatus === 'success' ? 'success' : ''}`} 
              onSubmit={handleSubmit}
            >
              {/* Success Overlay */}
              {submitStatus === 'success' && (
                <div className="success-overlay">
                  <div className="success-content">
                    <div className="success-icon">
                      <CheckCircle size={60} />
                    </div>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. We'll respond within 24 hours.</p>
                  </div>
                </div>
              )}

              <div className="form-row">
                <div className={`form-group ${focusedField === 'name' ? 'focused' : ''} ${errors.name ? 'error' : ''} ${formData.name ? 'has-value' : ''}`}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder="Enter your full name"
                  />
                  <span className="input-border"></span>
                  {errors.name && (
                    <span className="error-message">
                      <AlertCircle size={14} /> {errors.name}
                    </span>
                  )}
                </div>

                <div className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''} ${formData.email ? 'has-value' : ''}`}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder="Enter your email"
                  />
                  <span className="input-border"></span>
                  {errors.email && (
                    <span className="error-message">
                      <AlertCircle size={14} /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className={`form-group ${focusedField === 'phone' ? 'focused' : ''} ${errors.phone ? 'error' : ''} ${formData.phone ? 'has-value' : ''}`}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder="+94 77 123 4567"
                  />
                  <span className="input-border"></span>
                  {errors.phone && (
                    <span className="error-message">
                      <AlertCircle size={14} /> {errors.phone}
                    </span>
                  )}
                </div>

                <div className={`form-group ${focusedField === 'subject' ? 'focused' : ''} ${errors.subject ? 'error' : ''} ${formData.subject ? 'has-value' : ''}`}>
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                  >
                    {subjectOptions.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <span className="input-border"></span>
                  {errors.subject && (
                    <span className="error-message">
                      <AlertCircle size={14} /> {errors.subject}
                    </span>
                  )}
                </div>
              </div>

              <div className={`form-group full-width ${focusedField === 'message' ? 'focused' : ''} ${errors.message ? 'error' : ''} ${formData.message ? 'has-value' : ''}`}>
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  rows="5"
                  placeholder="Tell us how we can help you..."
                />
                <span className="input-border"></span>
                <span className="char-count">{formData.message.length}/500</span>
                {errors.message && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.message}
                  </span>
                )}
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="spin" size={20} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'error' && (
                <div className="submit-error">
                  <AlertCircle size={18} />
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}
            </form>
          </div>

          {/* SIDEBAR */}
          <div className="contact-sidebar">
            {/* Social Links */}
            <div className="social-card">
              <h3>Connect With Us</h3>
              <p>Follow us on social media for updates, behind-the-scenes, and exclusive offers.</p>
              
              <div className="social-grid">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-item"
                    style={{ '--social-color': social.color }}
                  >
                    <div className="social-icon">{social.icon}</div>
                    <div className="social-info">
                      <span className="social-name">{social.name}</span>
                      <span className="social-followers">{social.followers} followers</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="newsletter-card">
              <div className="newsletter-icon">
                <Mail size={32} />
              </div>
              <h3>Stay Updated</h3>
              <p>Subscribe to our newsletter for exclusive offers and new releases.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" />
                <button type="button">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="quick-contact-card">
              <h3>Need Immediate Help?</h3>
              <div className="quick-options">
                <a href="tel:+94112345678" className="quick-option">
                  <Phone size={20} />
                  <div>
                    <span className="option-label">Call Us Now</span>
                    <span className="option-value">+94 11 234 5678</span>
                  </div>
                </a>
                <a href="https://wa.me/94771234567" className="quick-option whatsapp">
                  <MessageCircle size={20} />
                  <div>
                    <span className="option-label">WhatsApp</span>
                    <span className="option-value">Chat with us</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MAP SECTION ==================== */}
      <section className="map-section animate-on-scroll" id="map">
        <div className="map-container">
          <div className="map-info">
            <span className="section-label">OUR LOCATION</span>
            <h2>Visit Our <span className="text-gold">Distillery</span></h2>
            <p>
              Experience the art of spirit-making firsthand. Tour our heritage 
              distillery and discover the secrets behind Ceylon's finest spirits.
            </p>
            
            <div className="location-details">
              <div className="location-item">
                <MapPin size={20} />
                <div>
                  <h4>Address</h4>
                  <p>42 Palm Grove Road, Kalutara, Sri Lanka</p>
                </div>
              </div>
              <div className="location-item">
                <Clock size={20} />
                <div>
                  <h4>Tour Hours</h4>
                  <p>Sat & Sun: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            <div className="map-actions">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MapPin size={18} /> Get Directions
              </a>
              <Link to="/tours" className="btn-outline">
                Book a Tour <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="map-frame">
            <div className="map-placeholder">
              <img 
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800" 
                alt="Distillery Location" 
                className="map-image"
              />
              <div className="map-overlay-content">
                <div className="map-pin">
                  <MapPin size={32} />
                </div>
                <span>Ceylon Spirits Distillery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="faq-section animate-on-scroll" id="faq">
        <div className="faq-container">
          <div className="section-header">
            <span className="section-label">HAVE QUESTIONS?</span>
            <h2>Frequently Asked <span className="text-gold">Questions</span></h2>
            <p>Find quick answers to common questions about our products and services.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
              >
                <button 
                  className="faq-question"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <div className="faq-icon">
                    {activeFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-cta">
            <p>Still have questions?</p>
            <a href="#main" className="link-gold">
              Contact our support team <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="contact-cta">
        <div className="cta-bg">
          <video autoPlay muted loop playsInline>
            <source src="https://videos.pexels.com/video-files/855078/855078-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="cta-overlay"></div>
        
        <div className="cta-content">
          <h2>Ready to Experience Ceylon's Finest?</h2>
          <p>Explore our collection of premium spirits crafted with a century of expertise.</p>
          <div className="cta-actions">
            <Link to="/shop" className="btn-primary">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn-outline">
              Learn Our Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;