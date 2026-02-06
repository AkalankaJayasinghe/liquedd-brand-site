// Authentication service for handling user login, registration, and token management
class AuthService {
  constructor() {
    this.baseURL = '/api/auth';
    this.tokenKey = 'authToken';
    this.userKey = 'userData';
  }

  // Get authorization headers
  getAuthHeaders() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Safe JSON response parser
  async parseResponse(response) {
    const text = await response.text();
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch {
      console.error('Server returned non-JSON response:', text.substring(0, 200));
      throw new Error('Server error: unexpected response. Is the backend running?');
    }
  }

  // Register new user
  async register(userData) {
    try {
      const response = await fetch(`${this.baseURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await this.parseResponse(response);

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await fetch(`${this.baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await this.parseResponse(response);

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token and user data
      if (data.token) {
        this.setToken(data.token);
        this.setUser(data.user);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  // Get current user profile
  async getProfile() {
    try {
      const response = await fetch(`${this.baseURL}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
      });

      const data = await this.parseResponse(response);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch profile');
      }

      return data.user;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(updateData) {
    try {
      const response = await fetch(`${this.baseURL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify(updateData),
      });

      const data = await this.parseResponse(response);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      // Update stored user data
      const currentUser = this.getUser();
      this.setUser({ ...currentUser, ...updateData });

      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await fetch(`${this.baseURL}/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify(passwordData),
      });

      const data = await this.parseResponse(response);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change password');
      }

      return data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  // Token management
  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // User data management
  setUser(user) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser() {
    const userData = localStorage.getItem(this.userKey);
    if (!userData) return null;
    
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Failed to parse user data:', error);
      localStorage.removeItem(this.userKey);
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }

  // Check if user is admin
  isAdmin() {
    const user = this.getUser();
    return user && user.role === 'admin';
  }

  // Check token validity (basic check)
  isTokenValid() {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decode JWT token (basic decoding without verification)
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      const payload = JSON.parse(atob(parts[1]));
      if (!payload.exp) return true; // No expiry set
      
      const expiry = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < expiry;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default AuthService;
