const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// 1. Get All Categories (Public - කාටත් බලන්න පුළුවන්)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM categories ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// 2. Create Category (Admin Only - Admin ට විතරයි හදන්න පුළුවන්)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
    const { name, description } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO categories (name, description) VALUES (?, ?)',
            [name, description]
        );
        res.status(201).json({ 
            message: 'Category created successfully', 
            categoryId: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Category name already exists' });
        }
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// 3. Delete Category (Admin Only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const [result] = await db.execute('DELETE FROM categories WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

module.exports = router;