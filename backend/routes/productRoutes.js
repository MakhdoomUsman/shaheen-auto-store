// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a new product
router.post('/add-product', productController.createProduct);

// Update an existing product
router.put('/:productId', productController.updateProduct);

// View all products
router.get('/get-all-product', productController.getAllProducts);

// Delete a product
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
