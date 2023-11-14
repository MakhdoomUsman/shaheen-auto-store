// index.js
const express = require("express");
const mongoose = require("./db");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const brandRoutes = require("./routes/brandRoutes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Use the product, category, subcategory, and brand routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/brands", brandRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
