// controllers/brandController.js
const Brand = require("../models/Brand");

// Create a new brand
const createBrand = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing brand
const updateBrand = async (req, res) => {
  const { brandId } = req.params;

  try {
    const updatedBrand = await Brand.findByIdAndUpdate(brandId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBrand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    res.json(updatedBrand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all brands
const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single brand by ID
const getBrandById = async (req, res) => {
  try {
    const brandId = req.params.id;
    const brand = await Brand.findById(brandId);

    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a brand
const deleteBrand = async (req, res) => {
  const { brandId } = req.params;

  try {
    const deletedBrand = await Brand.findByIdAndDelete(brandId);

    if (!deletedBrand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    res.json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all brands for a specific subcategory
const getBrandsBySubCategory = async (req, res) => {
  const { subCategoryId } = req.params;

  try {
    const brands = await Brand.find({ subcategory: subCategoryId });
    res.json(brands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createBrand,
  updateBrand,
  getAllBrands,
  deleteBrand,
  getBrandById,
  getBrandsBySubCategory,
};
