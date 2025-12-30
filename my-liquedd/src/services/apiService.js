// API utility service for common HTTP operations
class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || '/api';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Get authorization header if token exists
  getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Generic HTTP request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        ...this.defaultHeaders,
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different response types
      if (!response.ok) {
        const errorData = await this.handleError(response);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Return response based on content type
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Handle API errors
  async handleError(response) {
    try {
      const errorData = await response.json();
      return errorData;
    } catch {
      return {
        message: `Request failed with status ${response.status}`,
        status: response.status
      };
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // PATCH request
  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // Upload file
  async uploadFile(endpoint, file, additionalData = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add additional form data
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it
        ...this.getAuthHeaders(),
      },
    });
  }

  // Set authentication token
  setAuthToken(token) {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // Get authentication token
  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  // Clear authentication
  clearAuth() {
    localStorage.removeItem('authToken');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getAuthToken();
  }
}

// Utility functions for common operations
export const apiUtils = {
  // Format error messages for display
  formatErrorMessage: (error) => {
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    if (error.errors && Array.isArray(error.errors)) {
      return error.errors.join(', ');
    }
    return 'An unexpected error occurred';
  },

  // Check if error is due to network issues
  isNetworkError: (error) => {
    return error.name === 'TypeError' && error.message.includes('fetch');
  },

  // Check if error is due to authentication
  isAuthError: (error) => {
    return error.message && error.message.includes('401');
  },

  // Format query parameters
  formatParams: (params) => {
    const formatted = {};
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== null && value !== undefined && value !== '') {
        formatted[key] = value;
      }
    });
    return formatted;
  },

  // Debounce function for API calls
  debounce: (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }
};

// Create and export a singleton instance
export const apiService = new ApiService();
export default ApiService;