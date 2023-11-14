// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    // Add other reducers as needed
  },
});

export default store;
