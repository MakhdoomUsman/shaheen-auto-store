// models/SubCategory.js
const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  subCategory_name: {
    type: String,
    required: [true, 'SubCategory Name is required'],
  },
  subCategory_disc: {
    type: String,
    default: 'No description available',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
}, { timestamps: true });

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
