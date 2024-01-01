// controllers/categoryController.js
const Category = require("../models/Category");
const categoryModel = require("../models/handleModels/categoryModel");
const utils = require("../utils/utils");

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
    // console.log(req.query.page);
    // Fetch all products

    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 12;
    const sortDesc = req.query.sortDesc === "desc"; // Convert to boolean
    const query = req.query.query || "";

    const skip = (page - 1) * itemsPerPage;

    const paginatedRecords = await categoryModel.getPaginatedData(
      itemsPerPage,
      skip,
      sortDesc,
      query
    );
    req.total = await categoryModel.getTotalRecords(query);

    const response = utils.generateResponse(
      "SUCCESS",
      200,
      "Category List!",
      paginatedRecords,
      req
    );
    res.json(response);
  } catch (error) {
    console.error("Error in getVehicles:", error);
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
