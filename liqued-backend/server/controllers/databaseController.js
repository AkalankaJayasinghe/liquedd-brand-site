const db = require('../config/database');

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
      res.json({ tables: tableNames });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get tables' });
    }
  },

  // Get table structure
  getTableStructure: async (req, res) => {
    try {
      const { tableName } = req.params;
      const [columns] = await db.execute(`DESCRIBE ${tableName}`);
      res.json({ table: tableName, columns });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get table structure' });
    }
  },

  // Get table data
  getTableData: async (req, res) => {
    try {
      const { tableName } = req.params;
      const limit = req.query.limit || 100;
      const [rows] = await db.execute(`SELECT * FROM ${tableName} LIMIT ?`, [parseInt(limit)]);
      res.json({ table: tableName, data: rows, count: rows.length });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get table data' });
    }
  },

  // Seed sample data
  seedData: async (req, res) => {
    try {
      // Insert sample categories
      await db.execute(`
        INSERT IGNORE INTO categories (name, description) VALUES 
        ('Electronics', 'Electronic devices and gadgets'),
        ('Clothing', 'Apparel and fashion items'),
        ('Home & Garden', 'Home decor and garden supplies'),
        ('Sports', 'Sports equipment and accessories')
      `);

      // Insert sample products
      await db.execute(`
        INSERT IGNORE INTO products (name, description, price, category_id, stock) VALUES 
        ('Smartphone', 'Latest model smartphone with amazing features', 699.99, 1, 50),
        ('Laptop', 'High performance laptop for work and gaming', 1299.99, 1, 25),
        ('T-Shirt', 'Comfortable cotton t-shirt', 29.99, 2, 100),
        ('Running Shoes', 'Professional running shoes', 89.99, 4, 40)
      `);

      res.json({ 
        success: true, 
        message: 'Sample data seeded successfully' 
      });
    } catch (error) {
      console.error('Seed error:', error);
      res.status(500).json({ error: 'Failed to seed data', details: error.message });
    }
  },

  // Drop all tables (DANGEROUS - admin only)
  resetDatabase: async (req, res) => {
    try {
      await db.execute('SET FOREIGN_KEY_CHECKS = 0');
      await db.execute('DROP TABLE IF EXISTS contact_messages');
      await db.execute('DROP TABLE IF EXISTS products');
      await db.execute('DROP TABLE IF EXISTS categories');
      await db.execute('DROP TABLE IF EXISTS users');
      await db.execute('SET FOREIGN_KEY_CHECKS = 1');

      res.json({ 
        success: true, 
        message: 'All tables dropped. Run /init to recreate them.' 
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to reset database' });
    }
  }
};

module.exports = databaseController;
