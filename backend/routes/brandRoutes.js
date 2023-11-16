// routes/brandRoutes.js
const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// Create a new brand
router.post('/add-brand', brandController.createBrand);

// Update an existing brand
router.put('/:brandId', brandController.updateBrand);

// View all brands
router.get('/', brandController.getAllBrands);

// Delete a brand
router.delete('/:brandId', brandController.deleteBrand);

module.exports = router;
