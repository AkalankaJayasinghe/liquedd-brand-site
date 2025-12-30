const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/databaseController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Public route - check database status
router.get('/status', databaseController.getStatus);

// Protected routes (admin only)
router.post('/init', databaseController.initializeDatabase);
router.get('/tables', databaseController.getTables);
router.get('/tables/:tableName', databaseController.getTableStructure);
router.get('/tables/:tableName/data', databaseController.getTableData);
router.post('/seed', databaseController.seedData);
router.delete('/reset', authenticateToken, isAdmin, databaseController.resetDatabase);

module.exports = router;
