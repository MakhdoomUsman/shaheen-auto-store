// routes/subcategoryRoutes.js
const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const brandController = require('../controllers/brandController');

// Create a new subcategory
router.post('/', subcategoryController.createSubCategory);

// Update an existing subcategory
router.put('/:subCategoryId', subcategoryController.updateSubCategory);

// View all subcategories
router.get('/', subcategoryController.getAllSubCategories);

// Delete a subcategory
router.delete('/:subCategoryId', subcategoryController.deleteSubCategory);

// View all brands for a specific subcategory
router.get('/:subCategoryId/brands', brandController.getBrandsBySubCategory);

module.exports = router;
