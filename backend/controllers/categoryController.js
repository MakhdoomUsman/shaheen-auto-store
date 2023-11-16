// controllers/categoryController.js
const Category = require("../models/Category");

// Create a new category
const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing category
const updateCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get single category by id
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
  deleteCategory,
};
