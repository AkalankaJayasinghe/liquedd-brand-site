import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is admin
    if (!authService.isAuthenticated() || !authService.isAdmin()) {
      navigate('/admin/login');
      return;
    }

    const loadUserData = () => {
      const userData = authService.getUser();
      setUser(userData);
      setLoading(false);
    };

    loadUserData();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.username}!</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>Products</h3>
              <p className="stat-value">---</p>
              <span className="stat-label">Total products</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div className="stat-info">
              <h3>Categories</h3>
              <p className="stat-value">---</p>
              <span className="stat-label">Active categories</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📧</div>
            <div className="stat-info">
              <h3>Messages</h3>
              <p className="stat-value">---</p>
              <span className="stat-label">Contact messages</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>Users</h3>
              <p className="stat-value">---</p>
              <span className="stat-label">Registered users</span>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            <button 
              className="action-card"
              onClick={() => navigate('/admin/products')}
            >
              <span className="action-icon">🛍️</span>
              <h3>Manage Products</h3>
              <p>Add, edit, or remove products</p>
            </button>

            <button 
              className="action-card"
              onClick={() => navigate('/admin/categories')}
            >
              <span className="action-icon">📂</span>
              <h3>Manage Categories</h3>
              <p>Organize product categories</p>
            </button>

            <button 
              className="action-card"
              onClick={() => navigate('/admin/messages')}
            >
              <span className="action-icon">💬</span>
              <h3>View Messages</h3>
              <p>Check contact form submissions</p>
            </button>

            <button 
              className="action-card"
              onClick={() => navigate('/')}
            >
              <span className="action-icon">🏠</span>
              <h3>View Website</h3>
              <p>See the customer view</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
