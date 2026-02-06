const Product = require('../models/Product');

const productController = {
  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const { category_id, search } = req.query;
      const filters = {};
      
      if (category_id) filters.category_id = category_id;
      if (search) filters.search = search;

      const products = await Product.findAll(filters);
      res.json({ 
        success: true,
        products 
      });
    } catch (error) {
      console.error('Get products error:', error);
      res.status(500).json({ error: 'Server error fetching products' });
    }
  },

  // Get single product by ID
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json({ 
        success: true,
        product 
      });
    } catch (error) {
      console.error('Get product error:', error);
      res.status(500).json({ error: 'Server error fetching product' });
    }
  },

  // Create new product
  createProduct: async (req, res) => {
    try {
      const { name, description, price, category_id, stock } = req.body;
      const image_url = req.file ? `/uploads/${req.file.filename}` : null;

      // Validate required fields
      if (!name || !price || !category_id) {
        return res.status(400).json({ error: 'Name, price, and category are required' });
      }

      // Validate price
      if (isNaN(price) || parseFloat(price) < 0) {
        return res.status(400).json({ error: 'Price must be a positive number' });
      }

      const productId = await Product.create({
        name,
        description,
        price: parseFloat(price),
        category_id: parseInt(category_id),
        image_url,
        stock: stock ? parseInt(stock) : 0
      });

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        productId
      });
    } catch (error) {
      console.error('Create product error:', error);
      res.status(500).json({ error: 'Server error creating product' });
    }
  },

  // Update product
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, category_id, stock } = req.body;
      const updateData = {};

      if (name) updateData.name = name;
      if (description) updateData.description = description;
      if (price) {
        if (isNaN(price) || parseFloat(price) < 0) {
          return res.status(400).json({ error: 'Price must be a positive number' });
        }
        updateData.price = parseFloat(price);
      }
      if (category_id) updateData.category_id = parseInt(category_id);
      if (stock !== undefined) updateData.stock = parseInt(stock);
      if (req.file) updateData.image_url = `/uploads/${req.file.filename}`;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'No update data provided' });
      }

      const updated = await Product.updateById(id, updateData);

      if (updated) {
        res.json({ 
          success: true,
          message: 'Product updated successfully' 
        });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error('Update product error:', error);
      res.status(500).json({ error: 'Server error updating product' });
    }
  },

  // Delete product
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Product.deleteById(id);

      if (deleted) {
        res.json({ 
          success: true,
          message: 'Product deleted successfully' 
        });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error('Delete product error:', error);
      res.status(500).json({ error: 'Server error deleting product' });
    }
  }
};

module.exports = productController;