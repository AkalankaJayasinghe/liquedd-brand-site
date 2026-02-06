const db = require('../config/db');

const databaseController = {
  // Initialize all tables
  initializeDatabase: async (req, res) => {
    try {
      // Create users table
      await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(100) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role ENUM('user', 'admin') DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Create categories table
      await db.execute(`
        CREATE TABLE IF NOT EXISTS categories (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) UNIQUE NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Create products table
      await db.execute(`
        CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price DECIMAL(10, 2) NOT NULL,
          category_id INT,
          image_url VARCHAR(500),
          stock INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
        )
      `);

      // Create contact_messages table
      await db.execute(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(255) NOT NULL,
          subject VARCHAR(255),
          message TEXT NOT NULL,
          is_read BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      res.json({ 
        success: true, 
        message: 'Database tables initialized successfully',
        tables: ['users', 'categories', 'products', 'contact_messages']
      });
    } catch (error) {
      console.error('Database init error:', error);
      res.status(500).json({ error: 'Failed to initialize database', details: error.message });
    }
  },

  // Get database status
  getStatus: async (req, res) => {
    try {
      const [tables] = await db.execute('SHOW TABLES');
      
      const tableStats = [];
      for (const table of tables) {
        const tableName = Object.values(table)[0];
        const [count] = await db.execute(`SELECT COUNT(*) as count FROM ${tableName}`);
        tableStats.push({
          name: tableName,
          rows: count[0].count
        });
      }

      res.json({
        status: 'connected',
        database: process.env.DB_NAME || 'liqued_db',
        tables: tableStats
      });
    } catch (error) {
      console.error('Database status error:', error);
      res.status(500).json({ error: 'Failed to get database status', details: error.message });
    }
  },

  // Get all tables info
  getTables: async (req, res) => {
    try {
      const [tables] = await db.execute('SHOW TABLES');
      const tableNames = tables.map(t => Object.values(t)[0]);
      res.json({ 
        success: true,
        tables: tableNames 
      });
    } catch (error) {
      console.error('Get tables error:', error);
      res.status(500).json({ error: 'Failed to get tables' });
    }
  },

  // Get table structure
  getTableStructure: async (req, res) => {
    try {
      const { tableName } = req.params;
      const [columns] = await db.execute(`DESCRIBE ${tableName}`);
      
      res.json({
        success: true,
        table: tableName,
        columns
      });
    } catch (error) {
      console.error('Get table structure error:', error);
      res.status(500).json({ error: 'Failed to get table structure', details: error.message });
    }
  },

  // Get table data
  getTableData: async (req, res) => {
    try {
      const { tableName } = req.params;
      const { limit = 100, offset = 0 } = req.query;
      
      const [rows] = await db.execute(
        `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`,
        [parseInt(limit), parseInt(offset)]
      );
      
      const [countResult] = await db.execute(`SELECT COUNT(*) as total FROM ${tableName}`);
      
      res.json({
        success: true,
        table: tableName,
        total: countResult[0].total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        data: rows
      });
    } catch (error) {
      console.error('Get table data error:', error);
      res.status(500).json({ error: 'Failed to get table data', details: error.message });
    }
  },

  // Seed sample data
  seedData: async (req, res) => {
    try {
      // Insert sample categories
      await db.execute(`
        INSERT IGNORE INTO categories (id, name, description) VALUES
        (1, 'Energy Drinks', 'High caffeine energy drinks'),
        (2, 'Sports Drinks', 'Hydration and electrolyte drinks'),
        (3, 'Soft Drinks', 'Carbonated beverages'),
        (4, 'Water', 'Bottled water products')
      `);

      // Insert sample products
      await db.execute(`
        INSERT IGNORE INTO products (name, description, price, category_id, stock) VALUES
        ('Liqued Energy Original', 'Original flavor energy drink with natural ingredients', 2.99, 1, 100),
        ('Liqued Energy Berry Blast', 'Mixed berry flavored energy drink', 2.99, 1, 75),
        ('Liqued Hydrate', 'Electrolyte sports drink for optimal performance', 1.99, 2, 150),
        ('Liqued Sparkling Water', 'Naturally flavored sparkling water', 1.49, 4, 200)
      `);

      res.json({
        success: true,
        message: 'Sample data seeded successfully',
        data: {
          categories: 4,
          products: 4
        }
      });
    } catch (error) {
      console.error('Seed data error:', error);
      res.status(500).json({ error: 'Failed to seed data', details: error.message });
    }
  },

  // Reset database (drop and recreate tables)
  resetDatabase: async (req, res) => {
    try {
      // Drop tables in reverse order (to handle foreign keys)
      await db.execute('DROP TABLE IF EXISTS contact_messages');
      await db.execute('DROP TABLE IF EXISTS products');
      await db.execute('DROP TABLE IF EXISTS categories');
      await db.execute('DROP TABLE IF EXISTS users');

      // Recreate tables
      await databaseController.initializeDatabase(req, res);
    } catch (error) {
      console.error('Reset database error:', error);
      res.status(500).json({ error: 'Failed to reset database', details: error.message });
    }
  }
};

module.exports = databaseController;