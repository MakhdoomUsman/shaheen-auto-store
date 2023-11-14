// components/ProductDetailsTable.js

import React from 'react';

const ProductDetailsTable = ({ product }) => {
  const tableHeaders = Object.keys(product);

  return (
    <div>
      <h2>{product.name} Details</h2>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {tableHeaders.map((header) => (
              <td key={header}>{product[header]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetailsTable;
