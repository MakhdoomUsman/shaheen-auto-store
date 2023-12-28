// models/Product.js

const Product = require("../Product");

module.exports = {
  getPaginatedData: async (limit, skip, sortDesc, query) => {
    try {
      const sortOptions = {};
      if (sortDesc) {
        sortOptions.sortOrder = -1;
      } else {
        sortOptions.sortOrder = 1;
      }

      const paginatedData = await Product.find()
        .sort(sortOptions)
        .limit(limit)
        .skip(skip)
        .exec();

      return paginatedData;
    } catch (error) {
      console.error("Error retrieving paginated data:", error);
      throw error;
    }
  },

  getTotalRecords: async (query) => {
    try {
      const totalRecords = await Product.countDocuments(query).exec();
      return totalRecords;
    } catch (error) {
      console.error("Error retrieving total records:", error);
      throw error;
    }
  },
};
