// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const subcategoryController = require('../controllers/subcategoryController');

// Create a new category
router.post('/', categoryController.createCategory);

// Update an existing category
router.put('/:categoryId', categoryController.updateCategory);

// View all categories
router.get('/', categoryController.getAllCategories);

// Delete a category
router.delete('/:categoryId', categoryController.deleteCategory);

// View all subcategories for a specific category
router.get('/:categoryId/subcategories', subcategoryController.getSubCategoriesByCategory);

module.exports = router;
