import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: null,
    outOfStockProduct: 0,
    totolProducts: 0,
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const { setAllProducts } = productSlice.actions;
export default productSlice.reducer;
