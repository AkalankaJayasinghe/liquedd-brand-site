const db = require('../config/database');

class Product {
  static async create(productData) {
    const { name, description, price, category_id, image_url, stock = 0 } = productData;
    
    const [result] = await db.execute(
      'INSERT INTO products (name, description, price, category_id, image_url, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, category_id, image_url, stock]
    );
    
    return result.insertId;
  }

  static async findAll(filters = {}) {
    let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
    const params = [];

    if (filters.category_id) {
      query += ' AND p.category_id = ?';
      params.push(filters.category_id);
    }

    if (filters.search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    query += ' ORDER BY p.created_at DESC';

    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?',
      [id]
    );
    return rows[0];
  }

  static async updateById(id, updateData) {
    const fields = [];
    const values = [];
    
    for (const [key, value] of Object.entries(updateData)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
    
    values.push(id);
    
    const [result] = await db.execute(
      `UPDATE products SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return result.affectedRows;
  }

  static async deleteById(id) {
    const [result] = await db.execute(
      'DELETE FROM products WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }

  static async updateStock(id, quantity) {
    const [result] = await db.execute(
      'UPDATE products SET stock = stock + ? WHERE id = ?',
      [quantity, id]
    );
    return result.affectedRows;
  }
}

module.exports = Product;
