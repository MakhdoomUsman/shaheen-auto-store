// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: [true, "Category Name is required"],
    },
    category_disc: {
      type: String,
      default: "No description available",
    },
    category_type: {
      type: String,
      default: "Default Type",
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
