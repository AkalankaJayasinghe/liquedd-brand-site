import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check auth status on mount and when storage changes
    const checkAuth = () => {
      setIsLoggedIn(authService.isAuthenticated());
      setIsAdmin(authService.isAdmin());
    };

    checkAuth();

    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener('storage', checkAuth);
    
    // Custom event for same-tab login/logout
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAdmin(false);
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" className="logo-link">
              <h1>Liquedd</h1>
              <span className="logo-tagline">Premium Beverages</span>
            </Link>
          </div>
          
          <nav className="navigation">
            <ul className="nav-list">
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/products" className="nav-link">Products</Link></li>
              <li><Link to="/about" className="nav-link">About</Link></li>
              <li><Link to="/contact" className="nav-link">Contact</Link></li>
              
              {/* Admin Section */}
              {isAdmin ? (
                <>
                  <li className="admin-separator">|</li>
                  <li>
                    <Link to="/admin/dashboard" className="nav-link admin-link">
                      <svg className="admin-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                      </svg>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="nav-link logout-btn">
                      <svg className="logout-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                      </svg>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/admin/login" className="nav-link login-link">
                    <svg className="login-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;