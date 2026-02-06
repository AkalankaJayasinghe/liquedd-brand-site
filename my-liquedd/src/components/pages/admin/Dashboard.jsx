import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Package, FolderOpen, MessageSquare, Users,
  TrendingUp, TrendingDown, Eye, ShoppingBag, DollarSign,
  Bell, Settings, LogOut, ChevronRight, Calendar, Clock,
  BarChart3, PieChart, Activity, Globe, Award, Star,
  ArrowUpRight, ArrowDownRight, MoreVertical, Search,
  Menu, X, Sun, Moon, RefreshCw, Filter, Download,
  CheckCircle, AlertCircle, Info, Zap, Target, Sparkles
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: 'Admin', role: 'Super Admin' });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  
  // Animated Stats
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    messages: 0,
    users: 0,
    revenue: 0,
    orders: 0,
    views: 0,
    growth: 0
  });

  const targetStats = {
    products: 156,
    categories: 12,
    messages: 48,
    users: 1247,
    revenue: 2450000,
    orders: 892,
    views: 15420,
    growth: 23.5
  };

  // Animate counter on load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const animateStats = () => {
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          const progress = step / steps;
          const easeOut = 1 - Math.pow(1 - progress, 3);

          setStats({
            products: Math.floor(targetStats.products * easeOut),
            categories: Math.floor(targetStats.categories * easeOut),
            messages: Math.floor(targetStats.messages * easeOut),
            users: Math.floor(targetStats.users * easeOut),
            revenue: Math.floor(targetStats.revenue * easeOut),
            orders: Math.floor(targetStats.orders * easeOut),
            views: Math.floor(targetStats.views * easeOut),
            growth: parseFloat((targetStats.growth * easeOut).toFixed(1))
          });

          if (step >= steps) clearInterval(timer);
        }, interval);
      };

      animateStats();
    }
  }, [loading]);

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleLogout = () => {
    navigate('/admin/login');
  };

  // Chart Data (Visual representation)
  const chartData = [65, 78, 90, 81, 56, 72, 85, 91, 64, 75, 88, 95];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Recent Activities
  const recentActivities = [
    { id: 1, type: 'product', action: 'New product added', item: 'Johnnie Walker Blue Label', time: '5 min ago', icon: <Package size={16} />, color: '#10B981' },
    { id: 2, type: 'order', action: 'New order received', item: 'Order #1247', time: '12 min ago', icon: <ShoppingBag size={16} />, color: '#3B82F6' },
    { id: 3, type: 'user', action: 'New user registered', item: 'john.doe@email.com', time: '25 min ago', icon: <Users size={16} />, color: '#8B5CF6' },
    { id: 4, type: 'message', action: 'New contact message', item: 'Product inquiry', time: '1 hour ago', icon: <MessageSquare size={16} />, color: '#F59E0B' },
    { id: 5, type: 'product', action: 'Product updated', item: 'Hennessy XO', time: '2 hours ago', icon: <Package size={16} />, color: '#10B981' },
  ];

  // Top Products
  const topProducts = [
    { id: 1, name: 'Johnnie Walker Black', views: 1245, sales: 89, image: 'https://www.thewhiskyexchange.com/media/catalog/product/cache/1/image/500x500/9df78eab33525d08d6e5fb8d27136e95/j/o/johnnie_walker_black_label.jpg' },
    { id: 2, name: 'Hennessy VS', views: 1120, sales: 76, image: 'https://cdn.shopify.com/s/files/1/0013/2477/7569/products/Hennessy-VS_1024x1024.jpg' },
    { id: 3, name: 'Grey Goose Vodka', views: 980, sales: 65, image: 'https://cdn.shopify.com/s/files/1/0013/2477/7569/products/Grey-Goose_1024x1024.jpg' },
    { id: 4, name: 'Moët & Chandon', views: 856, sales: 54, image: 'https://cdn.shopify.com/s/files/1/0013/2477/7569/products/Moet-Imperial_1024x1024.jpg' },
  ];

  // Quick Stats Cards Data
  const statsCards = [
    { 
      title: 'Total Products', 
      value: stats.products, 
      icon: <Package size={24} />, 
      trend: '+12%', 
      trendUp: true,
      color: '#10B981',
      bgGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    },
    { 
      title: 'Categories', 
      value: stats.categories, 
      icon: <FolderOpen size={24} />, 
      trend: '+2', 
      trendUp: true,
      color: '#3B82F6',
      bgGradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
    },
    { 
      title: 'Messages', 
      value: stats.messages, 
      icon: <MessageSquare size={24} />, 
      trend: '+8', 
      trendUp: true,
      color: '#F59E0B',
      bgGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
    },
    { 
      title: 'Total Users', 
      value: stats.users.toLocaleString(), 
      icon: <Users size={24} />, 
      trend: '+18%', 
      trendUp: true,
      color: '#8B5CF6',
      bgGradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
    },
  ];

  // Navigation Items
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin', active: true },
    { icon: <Package size={20} />, label: 'Products', path: '/admin/products', badge: stats.products },
    { icon: <FolderOpen size={20} />, label: 'Categories', path: '/admin/categories' },
    { icon: <MessageSquare size={20} />, label: 'Messages', path: '/admin/messages', badge: stats.messages },
    { icon: <Users size={20} />, label: 'Users', path: '/admin/users' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/admin/analytics' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-content">
          <div className="loading-logo">
            <Sparkles className="sparkle-icon" size={40} />
          </div>
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <h2>Ceylon Spirits</h2>
          <p>Loading Dashboard...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`dashboard ${darkMode ? 'dark' : 'light'} ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      {/* Animated Background */}
      <div className="dashboard-bg">
        <div className="bg-gradient"></div>
        <div className="bg-grid"></div>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="bg-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <Sparkles size={24} />
            </div>
            {sidebarOpen && <span className="logo-text">Ceylon Spirits</span>}
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item, index) => (
            <Link 
              key={index}
              to={item.path}
              className={`nav-item ${item.active ? 'active' : ''}`}
              style={{ '--delay': `${index * 0.05}s` }}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && (
                <>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </>
              )}
              {item.active && <div className="nav-indicator"></div>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <span>{user.username.charAt(0)}</span>
              <div className="avatar-status"></div>
            </div>
            {sidebarOpen && (
              <div className="user-details">
                <span className="user-name">{user.username}</span>
                <span className="user-role">{user.role}</span>
              </div>
            )}
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <div className="header-greeting">
              <h1>
                Welcome back, <span className="text-gold">{user.username}</span>
                <span className="wave-emoji">👋</span>
              </h1>
              <p className="header-subtitle">
                <Calendar size={14} />
                {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                <span className="time-separator">•</span>
                <Clock size={14} />
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          <div className="header-right">
            <div className="header-search">
              <Search size={18} />
              <input type="text" placeholder="Search anything..." />
            </div>

            <button className={`header-btn refresh-btn ${refreshing ? 'refreshing' : ''}`} onClick={handleRefresh}>
              <RefreshCw size={20} />
            </button>

            <button className="header-btn notification-btn">
              <Bell size={20} />
              {notifications > 0 && <span className="notification-badge">{notifications}</span>}
            </button>

            <button className="header-btn theme-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="header-profile">
              <div className="profile-avatar">
                <span>{user.username.charAt(0)}</span>
              </div>
              <ChevronRight size={16} />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Stats Grid */}
          <section className="stats-section">
            <div className="section-header">
              <h2>Overview</h2>
              <div className="section-actions">
                <button className="action-btn">
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
                <button className="action-btn">
                  <Download size={16} />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="stats-grid">
              {statsCards.map((stat, index) => (
                <div 
                  key={index} 
                  className="stat-card"
                  style={{ '--delay': `${index * 0.1}s`, '--accent-color': stat.color }}
                >
                  <div className="stat-card-bg" style={{ background: stat.bgGradient }}></div>
                  <div className="stat-card-content">
                    <div className="stat-header">
                      <div className="stat-icon" style={{ background: stat.bgGradient }}>
                        {stat.icon}
                      </div>
                      <div className={`stat-trend ${stat.trendUp ? 'up' : 'down'}`}>
                        {stat.trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {stat.trend}
                      </div>
                    </div>
                    <div className="stat-body">
                      <h3 className="stat-value">{stat.value}</h3>
                      <p className="stat-title">{stat.title}</p>
                    </div>
                    <div className="stat-footer">
                      <div className="stat-progress">
                        <div className="progress-bar" style={{ width: '75%', background: stat.bgGradient }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Main Grid */}
          <div className="main-grid">
            {/* Chart Section */}
            <section className="chart-section">
              <div className="section-card">
                <div className="card-header">
                  <div className="card-title">
                    <BarChart3 size={20} />
                    <h3>Analytics Overview</h3>
                  </div>
                  <div className="card-actions">
                    <select className="chart-period">
                      <option>Last 12 months</option>
                      <option>Last 6 months</option>
                      <option>Last 30 days</option>
                    </select>
                    <button className="more-btn">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                <div className="chart-container">
                  <div className="chart-bars">
                    {chartData.map((value, index) => (
                      <div key={index} className="chart-bar-wrapper">
                        <div 
                          className="chart-bar"
                          style={{ 
                            '--height': `${value}%`,
                            '--delay': `${index * 0.05}s`
                          }}
                        >
                          <div className="bar-fill"></div>
                          <div className="bar-tooltip">{value}%</div>
                        </div>
                        <span className="bar-label">{months[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-dot" style={{ background: '#D4AF37' }}></span>
                    <span>Product Views</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ background: '#3B82F6' }}></span>
                    <span>User Engagement</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Activity Section */}
            <section className="activity-section">
              <div className="section-card">
                <div className="card-header">
                  <div className="card-title">
                    <Activity size={20} />
                    <h3>Recent Activity</h3>
                  </div>
                  <Link to="/admin/activity" className="view-all-link">
                    View All <ChevronRight size={16} />
                  </Link>
                </div>

                <div className="activity-list">
                  {recentActivities.map((activity, index) => (
                    <div 
                      key={activity.id} 
                      className="activity-item"
                      style={{ '--delay': `${index * 0.1}s` }}
                    >
                      <div className="activity-icon" style={{ background: activity.color }}>
                        {activity.icon}
                      </div>
                      <div className="activity-content">
                        <p className="activity-action">{activity.action}</p>
                        <p className="activity-item-name">{activity.item}</p>
                      </div>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Grid */}
          <div className="bottom-grid">
            {/* Top Products */}
            <section className="products-section">
              <div className="section-card">
                <div className="card-header">
                  <div className="card-title">
                    <Award size={20} />
                    <h3>Top Products</h3>
                  </div>
                  <Link to="/admin/products" className="view-all-link">
                    View All <ChevronRight size={16} />
                  </Link>
                </div>

                <div className="products-list">
                  {topProducts.map((product, index) => (
                    <div 
                      key={product.id} 
                      className="product-item"
                      style={{ '--delay': `${index * 0.1}s` }}
                    >
                      <span className="product-rank">#{index + 1}</span>
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="product-info">
                        <h4>{product.name}</h4>
                        <div className="product-stats">
                          <span><Eye size={12} /> {product.views}</span>
                          <span><ShoppingBag size={12} /> {product.sales}</span>
                        </div>
                      </div>
                      <div className="product-trend">
                        <TrendingUp size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="quick-actions-section">
              <div className="section-card">
                <div className="card-header">
                  <div className="card-title">
                    <Zap size={20} />
                    <h3>Quick Actions</h3>
                  </div>
                </div>

                <div className="quick-actions-grid">
                  <button 
                    className="quick-action-card"
                    onClick={() => navigate('/admin/products/new')}
                  >
                    <div className="action-icon" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                      <Package size={24} />
                    </div>
                    <div className="action-content">
                      <h4>Add Product</h4>
                      <p>Create new listing</p>
                    </div>
                    <ArrowUpRight size={20} className="action-arrow" />
                  </button>

                  <button 
                    className="quick-action-card"
                    onClick={() => navigate('/admin/categories/new')}
                  >
                    <div className="action-icon" style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)' }}>
                      <FolderOpen size={24} />
                    </div>
                    <div className="action-content">
                      <h4>Add Category</h4>
                      <p>Organize products</p>
                    </div>
                    <ArrowUpRight size={20} className="action-arrow" />
                  </button>

                  <button 
                    className="quick-action-card"
                    onClick={() => navigate('/admin/messages')}
                  >
                    <div className="action-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
                      <MessageSquare size={24} />
                    </div>
                    <div className="action-content">
                      <h4>View Messages</h4>
                      <p>{stats.messages} unread</p>
                    </div>
                    <ArrowUpRight size={20} className="action-arrow" />
                  </button>

                  <button 
                    className="quick-action-card"
                    onClick={() => navigate('/')}
                  >
                    <div className="action-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}>
                      <Globe size={24} />
                    </div>
                    <div className="action-content">
                      <h4>View Website</h4>
                      <p>Customer view</p>
                    </div>
                    <ArrowUpRight size={20} className="action-arrow" />
                  </button>
                </div>
              </div>
            </section>

            {/* Performance */}
            <section className="performance-section">
              <div className="section-card">
                <div className="card-header">
                  <div className="card-title">
                    <Target size={20} />
                    <h3>Performance</h3>
                  </div>
                </div>

                <div className="performance-metrics">
                  <div className="metric-item">
                    <div className="metric-circle">
                      <svg viewBox="0 0 36 36">
                        <path
                          className="circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="circle-progress"
                          strokeDasharray="85, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          style={{ stroke: '#10B981' }}
                        />
                      </svg>
                      <span className="metric-value">85%</span>
                    </div>
                    <p className="metric-label">Site Speed</p>
                  </div>

                  <div className="metric-item">
                    <div className="metric-circle">
                      <svg viewBox="0 0 36 36">
                        <path
                          className="circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="circle-progress"
                          strokeDasharray="92, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          style={{ stroke: '#3B82F6' }}
                        />
                      </svg>
                      <span className="metric-value">92%</span>
                    </div>
                    <p className="metric-label">Uptime</p>
                  </div>

                  <div className="metric-item">
                    <div className="metric-circle">
                      <svg viewBox="0 0 36 36">
                        <path
                          className="circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="circle-progress"
                          strokeDasharray="78, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          style={{ stroke: '#F59E0B' }}
                        />
                      </svg>
                      <span className="metric-value">78%</span>
                    </div>
                    <p className="metric-label">Conversion</p>
                  </div>
                </div>

                <div className="performance-summary">
                  <div className="summary-item success">
                    <CheckCircle size={16} />
                    <span>All systems operational</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;