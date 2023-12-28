import { createSlice } from "@reduxjs/toolkit";
import ApiService from "@/store/services/api.service";
import axios from "axios";
// save users in local storage

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    errorsList: null,
    users: null,
    singleUser: null,
    itemsPerPage: 25,
    currentPage: 1,
    globalSearch: "",
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setUsersErrors: (state, error) => {
      state.errorsList = error.payload;
    },
    setGlobalSearch: (state, error) => {
      state.globalSearch = error.payload;
    },
    removeUsersError: (state) => {
      state.errorsList = {};
    },
  },
});

export const {
  updateUser,
  removeUsersError,
  setUsersErrors,
  setUsers,
  setSingleUser,
  setItemsPerPage,
  setCurrentPage,
  getUsers,
  setGlobalSearch,
} = categorySlice.actions;
export default categorySlice.reducer;
