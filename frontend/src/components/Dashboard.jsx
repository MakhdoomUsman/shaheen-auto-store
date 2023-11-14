// pages/dashboard.js
import { getAllProducts } from "@/store/products/productSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaBox, FaFolder, FaTags, FaBan } from "react-icons/fa";
import ProductDetailsTable from "./product/ProductDetailsTable";
const Dashboard = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);
  const [selectedProduct, setSelectedProduct] = useState("products");
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const handleBlockClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className="bg-white p-4 border rounded cursor-pointer"
          onClick={() => handleBlockClick("products")}
        >
          <h2 className="text-lg font-semibold mb-2">All Products</h2>
          <p className="text-gray-500">1000</p>
          <FaBox className="text-3xl text-gray-500" />
        </div>

        <div
          className="bg-white p-4 border rounded cursor-pointer"
          onClick={() => handleBlockClick("categories")}
        >
          <h2 className="text-lg font-semibold mb-2">All Categories</h2>
          <p className="text-gray-500">50</p>
          <FaFolder className="text-3xl text-gray-500" />
        </div>

        <div
          className="bg-white p-4 border rounded cursor-pointer"
          onClick={() => handleBlockClick("brands")}
        >
          <h2 className="text-lg font-semibold mb-2">All Brands</h2>
          <p className="text-gray-500">20</p>
          <FaTags className="text-3xl text-gray-500" />
        </div>

        <div
          className="bg-white p-4 border rounded cursor-pointer"
          onClick={() => handleBlockClick("stockOut")}
        >
          <h2 className="text-lg font-semibold mb-2">Stock Out Products</h2>
          <p className="text-gray-500">10</p>
          <FaBan className="text-3xl text-gray-500" />
        </div>
      </div>

      <div className="mt-8">
        {selectedProduct && <ProductDetailsTable product={selectedProduct} />}
      </div>
    </div>
  );
};

export default Dashboard;
