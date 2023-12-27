import React, { useState, useEffect } from "react";
import Container from "../Container/Container";
import AdvanceTable from "../Table/Advancetable/Table";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/get-all-product"
        );
        const data = response.data;
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <Container>
        <div className="my-5">
          <AdvanceTable products={products?.products} addButton={"add-inventory"} />
        </div>
      </Container>
    </div>
  );
};

export default Products;
