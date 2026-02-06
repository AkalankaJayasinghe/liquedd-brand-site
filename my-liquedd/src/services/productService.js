import { authService } from './authService';

// Product service for API calls
class ProductService {
  constructor() {
    this.baseURL = '/api/products';
  }

  // Get authorization headers
  getAuthHeaders() {
    return authService.getAuthHeaders();
  }

  // Get all products with optional filtering
  async getProducts(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.category_id) params.append('category_id', filters.category_id);
      if (filters.search) params.append('search', filters.search);

      const queryString = params.toString();
      const url = queryString ? `${this.baseURL}?${queryString}` : this.baseURL;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if response is ok before parsing
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to fetch products';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const text = await response.text();
      if (!text) {
        return [];
      }
      const data = JSON.parse(text);

      return data.products || [];
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }

  // Get product by ID
  async getProductById(id) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Product not found';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const text = await response.text();
      if (!text) {
        throw new Error('Product not found');
      }
      const data = JSON.parse(text);

      return data.product;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      throw error;
    }
  }

  // Create new product (Admin only)
  async createProduct(productData) {
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description || '');
      formData.append('price', productData.price);
      formData.append('category_id', productData.category_id);
      formData.append('stock', productData.stock || 0);
      if (productData.brand) {
        formData.append('brand', productData.brand);
      }
      
      if (productData.image) {
        formData.append('image', productData.image);
      }

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          ...this.getAuthHeaders(),
          // Don't set Content-Type for FormData, browser will set it with boundary
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create product');
      }

      return data;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  }

  // Update product (Admin only)
  async updateProduct(id, productData) {
    try {
      const formData = new FormData();
      
      if (productData.name) formData.append('name', productData.name);
      if (productData.description) formData.append('description', productData.description);
      if (productData.price) formData.append('price', productData.price);
      if (productData.category_id) formData.append('category_id', productData.category_id);
      if (productData.stock !== undefined) formData.append('stock', productData.stock);
      if (productData.brand) formData.append('brand', productData.brand);
      if (productData.image) formData.append('image', productData.image);

      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'PUT',
        headers: {
          ...this.getAuthHeaders(),
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update product');
      }

      return data;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  }

  // Delete product (Admin only)
  async deleteProduct(id) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete product');
      }

      return data;
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const productService = new ProductService();
export default ProductService;