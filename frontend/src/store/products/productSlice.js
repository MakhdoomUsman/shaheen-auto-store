// src/productSlice.js

import productService from '@/services/productService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for getting all products
export const getAllProducts = createAsyncThunk('products/getAllProducts', async () => {
  const products = await productService.getAllProducts();
  return products;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    // Add other product-related state properties as needed
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
    });
  },
});

export default productSlice.reducer;
export const { /* Add other actions if needed */ } = productSlice.actions;
