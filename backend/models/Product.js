// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: [true, "Product Name is required"],
    },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: [true, "Category is required"],
    // },
    // subcategory: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "SubCategory",
    //   required: [true, "SubCategory is required"],
    // },
    // brand: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Brand",
    //   required: [true, "Brand is required"],
    // },
    unit: {
      type: String,
      required: [true, "Unit is required"],
    },
    sku: {
      type: String,
      unique: true,
    },
    minimum_quantity: {
      type: Number,
      required: [true, "Minimum Quantity is required"],
    },
    quantity: {
      type: String,
      required: [true, "Quantity is required"],
    },
    disc: {
      type: String,
    },
    tax: Number,
    discount_type: String,
    discount: Number,
    profit_type: {
      type: String,
      required: [true, "Profit Type is required"],
    },
    profit: {
      type: Number,
      required: [true, "Profit is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    selling_price: Number,
    status: {
      type: String,
      required: [true, "Status is required"],
    },
    images: [String], // Array of image URLs
    shop_box: {
      type: String,
      required: [true, "Shop Box is required"],
    },
    guarantee_type: {
      type: String,
      enum: ["day", "month", "year"],
      required: [true, "Guarantee Type is required"],
    },
    guarantee_in_months: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
