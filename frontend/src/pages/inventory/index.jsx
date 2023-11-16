import OverallInventory from "@/components/Inventory/OverallInventory";
import Products from "@/components/Inventory/Products";
import React from "react";

const Inventory = () => {
  return (
    <div>
      <OverallInventory />
      <Products />
    </div>
  );
};

export default Inventory;
