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
}

// Create and export a singleton instance
export const categoryService = new CategoryService();
export default CategoryService;
