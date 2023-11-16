// controllers/productController.js
const Product = require("../models/Product");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get single product by id
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Delete a product
const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
};
