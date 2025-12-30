const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken, isAdmin } = require('../middleware/auth');
// 👇 1. මේ Import එක අනිවාර්යයෙන්ම තියෙන්න ඕනේ
const { upload, handleUploadError } = require('../middleware/upload'); 

// Public routes (බඩු බලන්න)
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Protected routes (බඩු දාන්න - Admin Only)
router.post('/', 
  authenticateToken, 
  isAdmin, 
  // 👇 2. මේ පේළිය ("upload.single") නැත්නම් Backend එකට Data පේන්නේ නෑ!
  upload.single('image'), 
  handleUploadError,
  productController.createProduct
);

// Update Product
router.put('/:id', 
  authenticateToken, 
  isAdmin, 
  upload.single('image'), 
  handleUploadError,
  productController.updateProduct
);

// Delete Product
router.delete('/:id', 
  authenticateToken, 
  isAdmin, 
  productController.deleteProduct
);

module.exports = router;