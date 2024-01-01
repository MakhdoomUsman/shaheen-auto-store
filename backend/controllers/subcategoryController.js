// controllers/subcategoryController.js
const SubCategory = require("../models/SubCategory");
const SubCategoryModel = require("../models/handleModels/SubCategoryModel");
const utils = require("../utils/utils");

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
    // console.log(req.query.page);
    // Fetch all products

    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 12;
    const sortDesc = req.query.sortDesc === "desc"; // Convert to boolean
    const query = req.query.query || "";

    const skip = (page - 1) * itemsPerPage;

    const paginatedRecords = await SubCategoryModel.getPaginatedData(
      itemsPerPage,
      skip,
      sortDesc,
      query
    );
    req.total = await SubCategoryModel.getTotalRecords(query);

    const response = utils.generateResponse(
      "SUCCESS",
      200,
      "SubCategory List!",
      paginatedRecords,
      req
    );
    res.json(response);
  } catch (error) {
    console.error("Error in Gel all Subcategory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single subcategory by ID
const getSubcategoryById = async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const subcategory = await SubCategory.findById(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    res.status(200).json(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
