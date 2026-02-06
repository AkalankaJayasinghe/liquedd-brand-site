import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader,
  Sparkles, Shield, AlertCircle, CheckCircle, Wine,
  KeyRound, UserPlus, LogIn, ChevronLeft
} from 'lucide-react';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Password strength calculation
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const strengthColors = ['#EF4444', '#F59E0B', '#EAB308', '#22C55E', '#10B981'];

  // Validate field
  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        if (!value.trim()) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    setFocusedField(null);
  };

  const handleFocus = (e) => {
    setFocusedField(e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const fieldsToValidate = isLogin 
      ? ['email', 'password'] 
      : ['username', 'email', 'password', 'confirmPassword'];
    
    const newErrors = {};
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      
      // Redirect after success animation
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
      
    } catch (err) {
      setErrors({ submit: err.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setTouched({});
    setSuccess(false);
  };

  // Particles for background
  const particles = [...Array(50)].map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="login-page">
      {/* Animated Background */}
      <div className="login-bg">
        <div className="bg-gradient"></div>
        <div className="bg-pattern"></div>
        
        {/* Floating Particles */}
        <div className="particles">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="particle"
              style={{
                width: particle.size + 'px',
                height: particle.size + 'px',
                left: particle.x + '%',
                top: particle.y + '%',
                animationDuration: particle.duration + 's',
                animationDelay: particle.delay + 's'
              }}
            />
          ))}
        </div>

        {/* Animated Circles */}
        <div className="bg-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </div>

      {/* Back to Home Link */}
      <Link to="/" className="back-home-btn">
        <ChevronLeft size={20} />
        <span>Back to Home</span>
      </Link>

      {/* Login Container */}
      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="branding-content">
            <div className="brand-logo">
              <div className="logo-icon">
                <Wine size={32} />
              </div>
              <div className="logo-glow"></div>
            </div>
            
            <h1 className="brand-title">
              Ceylon <span className="text-gold">Spirits</span>
            </h1>
            <p className="brand-tagline">Admin Portal</p>
            
            <div className="brand-description">
              <p>Manage your premium spirits collection with our powerful admin dashboard.</p>
            </div>

            <div className="brand-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <Shield size={20} />
                </div>
                <div className="feature-text">
                  <h4>Secure Access</h4>
                  <p>Protected by advanced encryption</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <Sparkles size={20} />
                </div>
                <div className="feature-text">
                  <h4>Full Control</h4>
                  <p>Manage products, orders & more</p>
                </div>
              </div>
            </div>

            <div className="brand-footer">
              <p>© 2024 Ceylon Spirits. All rights reserved.</p>
            </div>
          </div>

          {/* Decorative Bottle */}
          <div className="branding-decoration">
            <img 
              src="https://www.thewhiskyexchange.com/media/catalog/product/cache/1/image/500x500/9df78eab33525d08d6e5fb8d27136e95/j/o/johnnie_walker_black_label.jpg" 
              alt="Premium Spirit" 
              className="floating-bottle"
            />
            <div className="bottle-glow"></div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-form-section">
          <div className={`login-card ${success ? 'success' : ''}`}>
            {/* Success Overlay */}
            {success && (
              <div className="success-overlay">
                <div className="success-content">
                  <div className="success-icon">
                    <CheckCircle size={60} />
                  </div>
                  <h2>Welcome Back!</h2>
                  <p>Redirecting to dashboard...</p>
                  <div className="success-loader">
                    <div className="loader-bar"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Header */}
            <div className="form-header">
              <div className="form-tabs">
                <button 
                  className={`form-tab ${isLogin ? 'active' : ''}`}
                  onClick={() => isLogin || toggleMode()}
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </button>
                <button 
                  className={`form-tab ${!isLogin ? 'active' : ''}`}
                  onClick={() => !isLogin || toggleMode()}
                >
                  <UserPlus size={18} />
                  <span>Register</span>
                </button>
                <div className={`tab-indicator ${isLogin ? 'left' : 'right'}`}></div>
              </div>
              
              <p className="form-subtitle">
                {isLogin 
                  ? 'Welcome back! Please sign in to continue.' 
                  : 'Create your admin account to get started.'}
              </p>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="error-alert">
                <AlertCircle size={18} />
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="login-form">
              {/* Username Field (Register only) */}
              {!isLogin && (
                <div className={`form-group ${focusedField === 'username' ? 'focused' : ''} ${errors.username && touched.username ? 'error' : ''} ${formData.username && !errors.username ? 'valid' : ''}`}>
                  <label htmlFor="username">
                    <User size={16} />
                    <span>Username</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder="Enter your username"
                      autoComplete="username"
                    />
                    <div className="input-border"></div>
                    {formData.username && !errors.username && touched.username && (
                      <CheckCircle size={18} className="input-valid-icon" />
                    )}
                  </div>
                  {errors.username && touched.username && (
                    <span className="field-error">
                      <AlertCircle size={14} />
                      {errors.username}
                    </span>
                  )}
                </div>
              )}

              {/* Email Field */}
              <div className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${errors.email && touched.email ? 'error' : ''} ${formData.email && !errors.email ? 'valid' : ''}`}>
                <label htmlFor="email">
                  <Mail size={16} />
                  <span>Email Address</span>
                </label>
                <div className="input-wrapper">
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                  <div className="input-border"></div>
                  {formData.email && !errors.email && touched.email && (
                    <CheckCircle size={18} className="input-valid-icon" />
                  )}
                </div>
                {errors.email && touched.email && (
                  <span className="field-error">
                    <AlertCircle size={14} />
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className={`form-group ${focusedField === 'password' ? 'focused' : ''} ${errors.password && touched.password ? 'error' : ''} ${formData.password && !errors.password ? 'valid' : ''}`}>
                <label htmlFor="password">
                  <Lock size={16} />
                  <span>Password</span>
                </label>
                <div className="input-wrapper">
                  <input
                    ref={passwordRef}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                  />
                  <div className="input-border"></div>
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <span className="field-error">
                    <AlertCircle size={14} />
                    {errors.password}
                  </span>
                )}
                
                {/* Password Strength Indicator (Register only) */}
                {!isLogin && formData.password && (
                  <div className="password-strength">
                    <div className="strength-bars">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className={`strength-bar ${i < passwordStrength ? 'active' : ''}`}
                          style={{ 
                            backgroundColor: i < passwordStrength ? strengthColors[passwordStrength - 1] : ''
                          }}
                        ></div>
                      ))}
                    </div>
                    <span 
                      className="strength-label"
                      style={{ color: strengthColors[passwordStrength - 1] || '#6b6b7b' }}
                    >
                      {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : 'Enter password'}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password Field (Register only) */}
              {!isLogin && (
                <div className={`form-group ${focusedField === 'confirmPassword' ? 'focused' : ''} ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''} ${formData.confirmPassword && !errors.confirmPassword ? 'valid' : ''}`}>
                  <label htmlFor="confirmPassword">
                    <KeyRound size={16} />
                    <span>Confirm Password</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />
                    <div className="input-border"></div>
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <span className="field-error">
                      <AlertCircle size={14} />
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              )}

              {/* Remember Me & Forgot Password (Login only) */}
              {isLogin && (
                <div className="form-options">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span className="checkbox-custom"></span>
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader size={20} className="spin" />
                    <span>Please wait...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            {/* Form Footer */}
            <div className="form-footer">
              <div className="divider">
                <span>or continue with</span>
              </div>
              
              <div className="social-login">
                <button type="button" className="social-btn google">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Google</span>
                </button>
                <button type="button" className="social-btn github">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;