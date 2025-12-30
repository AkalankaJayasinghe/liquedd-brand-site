const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Public route
router.post('/submit', contactController.submitContact);

// Admin routes
router.get('/', authenticateToken, isAdmin, contactController.getAllMessages);
router.get('/:id', authenticateToken, isAdmin, contactController.getMessageById);
router.put('/:id/read', authenticateToken, isAdmin, contactController.markAsRead);
router.delete('/:id', authenticateToken, isAdmin, contactController.deleteMessage);

module.exports = router;
