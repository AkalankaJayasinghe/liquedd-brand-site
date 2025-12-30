import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaCcVisa, FaCcMastercard, FaUniversity } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <>
      <footer className="footer-dark">
        <div className="footer-container">
          
          {/* Column 1: Online Shopping */}
          <div className="footer-col">
            <h3>Online Shopping</h3>
            <ul>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/account">My Account</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/delivery">Delivery</a></li>
              <li><a href="/returns">Returns and Refunds</a></li>
            </ul>
          </div>

          {/* Column 2: The Company */}
          <div className="footer-col">
            <h3>The Company</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/terms">Terms and Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Email Newsletter */}
          <div className="footer-col newsletter-col">
            <h3>Email Newsletter</h3>
            <p>Sign up to our amazing email newsletter to stay updated.</p>
            <form className="footer-form">
              <input type="email" placeholder="Your Email Address" className="email-input" />
              
              {/* Dark ReCAPTCHA Mock */}
              <div className="recaptcha-box">
                 <div className="recaptcha-check">
                    <input type="checkbox" /> <span>I'm not a robot</span>
                 </div>
                 <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="captcha" className="captcha-logo"/>
              </div>

              <button type="submit" className="btn-submit">SUBMIT</button>
            </form>
          </div>

          {/* Column 4: Connect & Payment */}
          <div className="footer-col">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon insta"><FaInstagram /></a>
              <a href="#" className="social-icon fb"><FaFacebookF /></a>
              <a href="#" className="social-icon whatsapp"><FaWhatsapp /></a>
            </div>

            <h3 className="payment-title">Payment Options</h3>
            <div className="payment-icons">
               <span className="pay-icon"><FaCcVisa size={30} color="#fff" /></span>
               <span className="pay-icon"><FaCcMastercard size={30} color="#fff" /></span>
               <span className="pay-icon"><FaUniversity size={25} color="#fff" /></span>
            </div>
          </div>

          {/* Column 5: Retail Store */}
          <div className="footer-col">
            <h3>Our Retail Store</h3>
            <address>
              New City Wine Stores<br/>
              No 14, Hampdon Lane<br/>
              Colombo 00600<br/>
              Sri Lanka<br/>
              Island of Ceylon
            </address>
            <a href="#" className="map-link">
              <FaMapMarkerAlt /> Google Maps Location
            </a>
          </div>

        </div>
        
        {/* Bottom Copyright Area */}
        <div className="footer-copyright">
           <p>&copy; Ceylon Spirits 2025. Please Drink Responsibly.</p>
        </div>
      </footer>

      {/* Sticky Notification Bar (Blue to stand out, or you can change to Gold) */}
      {showNotification && (
        <div className="notification-bar">
          <p>Shipping options are currently not available. Kindly <strong>WhatsApp</strong> us or <strong>call</strong> us on +94771898989 for further information.</p>
          <button onClick={() => setShowNotification(false)}>Dismiss</button>
        </div>
      )}
    </>
  );
};

export default Footer;