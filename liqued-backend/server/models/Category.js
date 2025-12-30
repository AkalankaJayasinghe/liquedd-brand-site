const db = require('../config/database');

class Category {
  static async create(categoryData) {
    const { name, description } = categoryData;
    
    const [result] = await db.execute(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description]
    );
    
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute(
      'SELECT * FROM categories ORDER BY name ASC'
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM categories WHERE id = ?',
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
      `UPDATE categories SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return result.affectedRows;
  }

  static async deleteById(id) {
    const [result] = await db.execute(
      'DELETE FROM categories WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }

  static async getProductCount(id) {
    const [rows] = await db.execute(
      'SELECT COUNT(*) as count FROM products WHERE category_id = ?',
      [id]
    );
    return rows[0].count;
  }
}

module.exports = Category;
