// models/Brand.js
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  brand_name: {
    type: String,
    required: [true, 'Brand Name is required'],
  },
  brand_disc: {
    type: String,
    default: 'No description available',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: [true, 'SubCategory is required'],
  },
}, { timestamps: true });

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
