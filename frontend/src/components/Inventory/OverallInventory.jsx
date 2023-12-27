import React from "react";
import Container from "../Container/Container";

const OverallInventory = () => {
  const { outOfStockProduct } = useSelector((state) => state.product);
  return (
    <Container>
      <div className="border rounded-lg shadow-sm p-5">
        <h1 className="text-lg font-semibold capitalize">Overall Inventory</h1>
        <div className="grid grid-cols-4 gap-5 my-2.5">
          <div className="border p-2.5 rounded bg-orange-50">
            <h1 className="font-semibold text-orange-500">Total Products</h1>
            <div className="flex justify-between">
              <h1 className="font-semibold text-sm">1489</h1>
              <h1 className="font-semibold text-sm">Rr. 2736400</h1>
            </div>
            <p className="text-sm text-gray-500">All time</p>
          </div>
          <div className="border p-2.5 rounded bg-blue-50">
            <h1 className="font-semibold text-sky-500">Today Sale</h1>
            <h1 className="font-semibold text-sm">14</h1>
            <p className="text-sm text-gray-500">Today</p>
          </div>
          <div className="border p-2.5 rounded bg-purple-50">
            <h1 className="font-semibold text-purple-500">Brands</h1>
            <h1 className="font-semibold text-sm">14</h1>
            <p className="text-sm text-gray-500">{new Date().getDate()}</p>
          </div>
          <div className="border p-2.5 rounded bg-red-50">
            <h1 className="font-semibold text-red-500">Low Stocks</h1>
            <div className="font-semibold text-sm flex justify-between">
              <p>{outOfStockProduct}</p>
              <p>4</p>
            </div>
            <div className="text-sm text-gray-500 flex justify-between">
              <p>ordered</p>
              <p>In stock</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OverallInventory;
