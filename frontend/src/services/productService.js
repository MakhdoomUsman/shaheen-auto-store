// src/services/productService.js

import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Replace with your actual API base URL

const productService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/products/get-all-product`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Add other product-related API calls as needed
};

export default productService;
