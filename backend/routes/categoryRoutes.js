// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const subcategoryController = require('../controllers/subcategoryController');

// Create a new category
router.post('/add-category', categoryController.createCategory);

// Update an existing category
router.put('/update-category/:categoryId', categoryController.updateCategory);

// View all categories
router.get('/get-all-category', categoryController.getAllCategories);

// View single category 
router.get('/:id', categoryController.getCategoryById);

// Delete a category
router.delete('/:categoryId', categoryController.deleteCategory);

// View all subcategories for a specific category
router.get('/:categoryId/subcategories', subcategoryController.getSubCategoriesByCategory);

module.exports = router;
