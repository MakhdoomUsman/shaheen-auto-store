// routes/brandRoutes.js
const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// Create a new brand
router.post('/add-brand', brandController.createBrand);

// Update an existing brand
router.put('/update-brand/:brandId', brandController.updateBrand);

// View all brands
router.get('/get-all-brands', brandController.getAllBrands);

// Get a single brand by ID
router.get('/get-single-brand/:id', brandController.getBrandById);

// Delete a brand
router.delete('/:brandId', brandController.deleteBrand);

module.exports = router;
