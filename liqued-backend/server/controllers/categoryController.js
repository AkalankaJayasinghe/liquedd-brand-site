const Category = require('../models/Category');

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error fetching categories' });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json({ category });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ error: 'Server error fetching category' });
  }
};

// Create new category (Admin only)
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Category name is required' });
    }
    
    // Check if category already exists
    const existingCategory = await Category.findByName(name.trim());
    if (existingCategory) {
      return res.status(400).json({ error: 'Category with this name already exists' });
    }
    
    const result = await Category.create({
      name: name.trim(),
      description: description || ''
    });
    
    res.status(201).json({
      message: 'Category created successfully',
      category: {
        id: result.insertId,
        name: name.trim(),
        description: description || ''
      }
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Server error creating category' });
  }
};

// Update category (Admin only)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    if (name) {
      // Check if another category has this name
      const existingCategory = await Category.findByName(name.trim());
      if (existingCategory && existingCategory.id !== parseInt(id)) {
        return res.status(400).json({ error: 'Category with this name already exists' });
      }
    }
    
    await Category.update(id, {
      name: name ? name.trim() : category.name,
      description: description !== undefined ? description : category.description
    });
    
    res.json({
      message: 'Category updated successfully',
      category: {
        id: parseInt(id),
        name: name ? name.trim() : category.name,
        description: description !== undefined ? description : category.description
      }
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Server error updating category' });
  }
};

// Delete category (Admin only)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    // Check if category has products
    const products = await Category.getProducts(id);
    if (products && products.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete category with existing products. Please remove or reassign products first.' 
      });
    }
    
    await Category.delete(id);
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Server error deleting category' });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
