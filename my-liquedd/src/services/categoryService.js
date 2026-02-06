// Category service for API calls
class CategoryService {
  constructor() {
    this.baseURL = '/api/categories';
  }

  // Get all categories
  async getCategories() {
    try {
      const response = await fetch(this.baseURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to fetch categories';
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

      // Handle both array response and { categories: [...] } format
      if (Array.isArray(data)) {
        return data;
      }
      return data.categories || [];
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  }

  // Get category by ID
  async getCategoryById(id) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Category not found';
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
        throw new Error('Category not found');
      }
      const data = JSON.parse(text);

      return data.category;
    } catch (error) {
      console.error('Failed to fetch category:', error);
      throw error;
    }
  }

  // Get authorization headers
  getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Create new category (Admin only)
  async createCategory(categoryData) {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to create category';
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
        return { success: true };
      }
      return JSON.parse(text);
    } catch (error) {
      console.error('Failed to create category:', error);
      throw error;
    }
  }

  // Update category (Admin only)
  async updateCategory(id, categoryData) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to update category';
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
        return { success: true };
      }
      return JSON.parse(text);
    } catch (error) {
      console.error('Failed to update category:', error);
      throw error;
    }
  }

  // Delete category (Admin only)
  async deleteCategory(id) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to delete category';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      return { success: true };
    } catch (error) {
      console.error('Failed to delete category:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const categoryService = new CategoryService();
export default CategoryService;
