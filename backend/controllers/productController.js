// controllers/productController.js
const vehicleView = require("../Views/vehicleView");
const Product = require("../models/Product");
const productModel = require("../models/handleModels/productModel");
const utils = require("../utils/utils");
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
    // console.log(req.query.page);
    // Fetch all products

    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 12;
    const sortDesc = req.query.sortDesc === "desc"; // Convert to boolean
    const query = req.query.query || "";

    const skip = (page - 1) * itemsPerPage;

    const paginatedRecords = await productModel.getPaginatedData(
      itemsPerPage,
      skip,
      sortDesc,
      query
    );
    req.total = await productModel.getTotalRecords(query);

    const response = utils.generateResponse(
      "SUCCESS",
      200,
      "Products List!",
      paginatedRecords,
      req
    );
    res.json(response);
  } catch (error) {
    console.error("Error in getVehicles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // const products = await Product.find();

  // // Calculate total number of products
  // const totalProducts = products.length;

  // // Calculate the count of products where quantity <= minimum_quantity
  // const lowQuantityProducts = products.filter(product => product.quantity <= product.minimum_quantity).length;

  // // Prepare the response
  // const response = {
  //   totalProducts,
  //   lowQuantityProducts,
  //   products
  // };

  // res.json(response);
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
