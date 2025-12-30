const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes (logged in users)
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, authController.updateProfile);
router.put('/change-password', authenticateToken, authController.changePassword);

// Admin routes
router.get('/users', authenticateToken, isAdmin, authController.getAllUsers);
router.delete('/users/:id', authenticateToken, isAdmin, authController.deleteUser);

module.exports = router;
