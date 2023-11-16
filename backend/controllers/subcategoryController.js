// controllers/subcategoryController.js
const SubCategory = require("../models/SubCategory");

// Create a new subcategory
const createSubCategory = async (req, res) => {
  try {
    const newSubCategory = new SubCategory(req.body);
    await newSubCategory.save();
    res.status(201).json(newSubCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing subcategory
const updateSubCategory = async (req, res) => {
  const { subCategoryId } = req.params;

  try {
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      subCategoryId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSubCategory) {
      return res.status(404).json({ error: "SubCategory not found" });
    }

    res.json(updatedSubCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all subcategories
const getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find();
    res.json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single subcategory by ID
const getSubcategoryById = async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const subcategory = await Subcategory.findById(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    res.status(200).json(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a subcategory
const deleteSubCategory = async (req, res) => {
  const { subCategoryId } = req.params;

  try {
    const deletedSubCategory = await SubCategory.findByIdAndDelete(
      subCategoryId
    );

    if (!deletedSubCategory) {
      return res.status(404).json({ error: "SubCategory not found" });
    }

    res.json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all subcategories for a specific category
const getSubCategoriesByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const subcategories = await SubCategory.find({ category: categoryId });
    res.json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createSubCategory,
  updateSubCategory,
  getAllSubCategories,
  deleteSubCategory,
  getSubcategoryById,
  getSubCategoriesByCategory,
};
