// models/Brand.js
const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    brand_name: {
      type: String,
      required: [true, "Brand Name is required"],
    },
    brand_disc: {
      type: String,
      default: "No description available",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: [true, "SubCategory is required"],
    },
  },
  { timestamps: true }
);
brandSchema.pre("find", function (next) {
  this.populate("category", "category_name"); // Assuming 'category_name' is the field in the 'Category' model
  this.populate("subcategory", "subCategory_name"); // Assuming 'subcategory_name' is the field in the 'SubCategory' model
  next();
});
const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
