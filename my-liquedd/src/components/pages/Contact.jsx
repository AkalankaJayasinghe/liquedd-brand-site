import { useState } from 'react';
import { useForm, validationRules } from '../../hooks/useForm';
import { contactService } from '../../services/contactService';
import './Contact.css';

const Contact = () => {
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const formValidation = {
    name: [validationRules.required, validationRules.minLength(2)],
    email: [validationRules.required, validationRules.email],
    subject: [validationRules.required, validationRules.minLength(5)],
    message: [validationRules.required, validationRules.minLength(10)]
  };

  const {
    values: formData,
    errors: _errors,
    touched: _touched,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useForm({
    name: '',
    email: '',
    subject: '',
    message: ''
  }, formValidation);

  const onSubmit = async (data) => {
    setSubmitMessage('');
    setMessageType('');
    
    try {
      const result = await contactService.submitContactForm({
        fullName: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message
      });
      setSubmitMessage(result.message);
      setMessageType('success');
    } catch (error) {
      setSubmitMessage(error.message);
      setMessageType('error');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit);
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Our Location',
      details: [
        'Liquedd Headquarters',
        '123 Beverage Street',
        'New York, NY 10001',
        'United States'
      ]
    },
    {
      icon: '📞',
      title: 'Phone Numbers',
      details: [
        'Main Office: +1 (555) 123-4567',
        'Customer Service: +1 (555) 234-5678',
        'Sales Inquiries: +1 (555) 345-6789'
      ]
    },
    {
      icon: '📧',
      title: 'Email Addresses',
      details: [
        'General: info@liquedd.com',
        'Support: support@liquedd.com',
        'Sales: sales@liquedd.com',
        'Media: press@liquedd.com'
      ]
    },
    {
      icon: '🕒',
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 10:00 AM - 4:00 PM',
        'Sunday: Closed',
        'Emergency Support: 24/7'
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com/liquedd' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com/liquedd' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/liquedd' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/company/liquedd' }
  ];

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with our team.</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content section">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-header">
                <h2>Send Us a Message</h2>
                <p>Have a question or want to learn more about our products? Drop us a line!</p>
              </div>

              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="support">Customer Support</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitMessage && (
                  <div className={`submit-message ${messageType}`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <div className="info-header">
                <h2>Contact Information</h2>
                <p>Find us using the information below or visit our location.</p>
              </div>

              <div className="contact-info-grid">
                {contactInfo.map((info, index) => (
                  <div key={index} className="info-card card">
                    <div className="info-icon">{info.icon}</div>
                    <h3>{info.title}</h3>
                    <div className="info-details">
                      {info.details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="social-section">
                <h3>Follow Us</h3>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                    >
                      <span className="social-icon">{social.icon}</span>
                      <span className="social-name">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2>Find Our Location</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-content">
                <div className="map-icon">🗺️</div>
                <h3>Interactive Map</h3>
                <p>123 Beverage Street, New York, NY 10001</p>
                <p>In a real application, this would be an embedded Google Maps or similar service.</p>
                <div className="map-buttons">
                  <button className="btn btn-primary">Get Directions</button>
                  <button className="btn btn-secondary">View on Map</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </div>

          <div className="faq-grid grid grid-2">
            <div className="faq-item card">
              <h4>What are your shipping options?</h4>
              <p>We offer standard (3-5 business days) and express (1-2 business days) shipping options. Free shipping is available on orders over $50.</p>
            </div>

            <div className="faq-item card">
              <h4>Do you offer bulk discounts?</h4>
              <p>Yes! We offer volume discounts for orders over 50 units. Contact our sales team for custom pricing on large orders.</p>
            </div>

            <div className="faq-item card">
              <h4>Are your products organic?</h4>
              <p>Many of our products are made with organic ingredients. Look for the organic certification on individual product pages.</p>
            </div>

            <div className="faq-item card">
              <h4>How can I become a retailer?</h4>
              <p>We're always looking for new retail partners. Contact our sales team with details about your business and location.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;