import { createSlice } from "@reduxjs/toolkit";
import ApiService from "@/store/services/api.service";
import axios from "axios";
// save subCategories in local storage

export const categorySlice = createSlice({
  name: "subCategory",
  initialState: {
    errorsList: null,
    subCategories: null,
    singleSubCategory: null,
    itemsPerPage: 25,
    currentPage: 1,
    globalSearch: "",
  },
  reducers: {
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
    setSingleSubCategory: (state, action) => {
      state.singleSubCategory = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSubCategoriesErrors: (state, error) => {
      state.errorsList = error.payload;
    },
    setGlobalSearch: (state, error) => {
      state.globalSearch = error.payload;
    },
    removeSubCategoriesError: (state) => {
      state.errorsList = {};
    },
  },
});

export const {
  updateSubCategory,
  removeSubCategoriesError,
  setSubCategoriesErrors,
  setSubCategories,
  setSingleSubCategory,
  setItemsPerPage,
  setCurrentPage,
  getSubCategories,
  setGlobalSearch,
} = categorySlice.actions;
export default categorySlice.reducer;
