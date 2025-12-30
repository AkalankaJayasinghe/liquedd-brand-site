import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Products from './components/pages/Products';
import Contact from './components/pages/Contact';
import Login from './components/pages/admin/Login';
import Dashboard from './components/pages/admin/Dashboard';
import ProductManagement from './components/pages/admin/ProductManagement';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Admin Routes (no header/footer) */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          
          {/* Public Routes (with header/footer) */}
          <Route path="/*" element={
            <>
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
