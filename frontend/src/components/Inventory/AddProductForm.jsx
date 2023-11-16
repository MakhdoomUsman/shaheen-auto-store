import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Spacer,
  Select,
  Textarea,
  SelectItem,
} from "@nextui-org/react";
import * as yup from "yup";

const schema = yup.object().shape({
  product_name: yup.string().required("Product Name is required"),
  unit: yup.string().required("Unit is required"),
  sku: yup.string().required("sku is required"),
  minimum_quantity: yup.number().required("minimum_quantity is required"),
  quantity: yup.number().required("quantity is required"),
  disc: yup.string().required("disc is required"),
  tax: yup.number().required("tax is required"),
  discount_type: yup.string().required("discount_type is required"),
  discount: yup.number().required("discount is required"),
  profit_type: yup.string().required("profit_type is required"),
  profit: yup.number().required("profit is required"),
  price: yup.number().required("price is required"),
  selling_price: yup.number().required("selling_price is required"),
  shop_box: yup.string().required("shop_box is required"),
  guarantee_in_months: yup.number().required("guarantee_in_months is required"),
});

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    product_name: "",
    unit: "number",
    sku: "",
    minimum_quantity: 0,
    quantity: 0,
    disc: "",
    tax: 0,
    discount_type: "fixed",
    discount: 0,
    profit_type: "fixed",
    profit: 0,
    price: 0,
    selling_price: 0,
    status: "active",
    images: [],
    shop_box: "",
    guarantee_type: "",
    guarantee_in_months: 0,
  });

  const [validationResult, setValidationResult] = useState({});

  const handleValidation = async () => {
    try {
      await schema.validate(productData, { abortEarly: false });
      setValidationResult({});
      return true; // Validation successful
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setValidationResult(validationErrors);
      return false; // Validation failed
    }
  };
  useEffect(() => {
    // Update selling_price when price, profit, or profit_type changes
    const calculateSellingPrice = () => {
      let calculatedSellingPrice = productData.price;

      if (productData.profit_type === "percentage") {
        const profitAmount = (productData.price * productData.profit) / 100;
        calculatedSellingPrice += profitAmount;
      } else {
        calculatedSellingPrice += productData.profit;
      }

      setProductData((prevProductData) => ({
        ...prevProductData,
        selling_price: calculatedSellingPrice,
      }));
    };

    calculateSellingPrice();
  }, [productData.price, productData.profit, productData.profit_type]);
  const handleAddProduct = async () => {
    const isValid = await handleValidation();
    console.log("prodcut data", productData);
    if (isValid) {
      // Validation successful, proceed with the API call or other actions
      // Example API call
      // api.addProduct(productData)
      //   .then((response) => {
      //     // Handle success
      //     toasts.success('Product added successfully');
      //   })
      //   .catch((error) => {
      //     // Handle error
      //     toasts.error('Failed to add product');
      //   });
      console.log("Product added successfully");
    } else {
      // Validation failed, show error messages
      console.log("Validation failed", validationResult);
    }
  };

  return (
    <div className="my-10 grid-cols-2 grid items-start  gap-5 border rounded-2xl p-5">
      {/* Product Name */}
      <Input
        type="text"
        label="Product Name"
        placeholder="Enter product name"
        labelPlacement="outside"
        value={productData.product_name}
        isInvalid={validationResult.product_name}
        errorMessage={validationResult.product_name}
        onChange={(e) =>
          setProductData({ ...productData, product_name: e.target.value })
        }
      />

      {/* Unit */}
      <Select
        label="Unit"
        placeholder="Select unit"
        labelPlacement="outside"
        value={productData.unit}
        onChange={(e) =>
          setProductData({ ...productData, unit: e.target.value })
        }
      >
        <SelectItem value="kg">Kg</SelectItem>
        <SelectItem value="number">Number</SelectItem>
        {/* Add other unit options here */}
      </Select>

      {/* SKU */}
      <Input
        type="text"
        label="SKU"
        placeholder="Enter SKU"
        labelPlacement="outside"
        value={productData.sku}
        isInvalid={validationResult.sku}
        errorMessage={validationResult.sku}
        onChange={(e) =>
          setProductData({ ...productData, sku: e.target.value })
        }
      />

      {/* Minimum Quantity */}
      <Input
        type="number"
        label="Minimum Quantity"
        placeholder="Enter minimum quantity"
        labelPlacement="outside"
        value={productData.minimum_quantity}
        isInvalid={validationResult.minimum_quantity}
        errorMessage={validationResult.minimum_quantity}
        onChange={(e) =>
          setProductData({
            ...productData,
            minimum_quantity: parseInt(e.target.value),
          })
        }
      />

      {/* Quantity */}
      <Input
        type="number"
        label="Quantity"
        placeholder="Enter quantity"
        labelPlacement="outside"
        value={productData.quantity}
        isInvalid={validationResult.quantity}
        errorMessage={validationResult.quantity}
        onChange={(e) =>
          setProductData({ ...productData, quantity: parseInt(e.target.value) })
        }
      />

      {/* Disc */}
      <Textarea
        label="Description"
        placeholder="Enter product description"
        labelPlacement="outside"
        value={productData.disc}
        onChange={(e) =>
          setProductData({ ...productData, disc: e.target.value })
        }
      />

      {/* Tax */}
      <Input
        type="number"
        label="Tax"
        placeholder="Enter tax"
        labelPlacement="outside"
        value={productData.tax}
        isInvalid={validationResult.tax}
        errorMessage={validationResult.tax}
        onChange={(e) =>
          setProductData({ ...productData, tax: parseInt(e.target.value) })
        }
      />

      {/* Discount Type */}
      <Select
        label="Discount Type"
        placeholder="Select discount type"
        labelPlacement="outside"
        value={productData.discount_type}
        onChange={(e) =>
          setProductData({ ...productData, discount_type: e.target.value })
        }
      >
        <SelectItem value="fixed">Fixed</SelectItem>
        <SelectItem value="percentage">Percentage</SelectItem>
        {/* Add other discount type options here */}
      </Select>

      {/* Discount */}
      <Input
        type="number"
        label="Discount"
        placeholder="Enter discount"
        labelPlacement="outside"
        value={productData.discount}
        isInvalid={validationResult.discount}
        errorMessage={validationResult.discount}
        onChange={(e) =>
          setProductData({ ...productData, discount: parseInt(e.target.value) })
        }
      />

      {/* Profit Type */}
      <Select
        label="Profit Type"
        placeholder="Select profit type"
        labelPlacement="outside"
        value={productData.profit_type}
        onChange={(e) =>
          setProductData({ ...productData, profit_type: e.target.value })
        }
      >
        <SelectItem value="fixed">Fixed</SelectItem>
        <SelectItem value="percentage">Percentage</SelectItem>
        {/* Add other profit type options here */}
      </Select>

      {/* Profit */}
      <Input
        type="number"
        label="Profit"
        placeholder="Enter profit"
        labelPlacement="outside"
        value={productData.profit}
        isInvalid={validationResult.profit}
        errorMessage={validationResult.profit}
        onChange={(e) =>
          setProductData({ ...productData, profit: parseInt(e.target.value) })
        }
      />

      {/* Price */}
      <Input
        type="number"
        label="Price"
        placeholder="Enter price"
        labelPlacement="outside"
        value={productData.price}
        isInvalid={validationResult.price}
        errorMessage={validationResult.price}
        onChange={(e) =>
          setProductData({ ...productData, price: parseInt(e.target.value) })
        }
      />

      {/* Selling Price */}
      <Input
        type="number"
        label="Selling Price"
        placeholder="Selling price will be calculated"
        labelPlacement="outside"
        value={productData.selling_price}
        isInvalid={validationResult.selling_price}
        errorMessage={validationResult.selling_price}
        disabled
      />

      {/* Shop Box */}
      <Input
        type="text"
        label="Shop Box"
        placeholder="Enter shop box"
        labelPlacement="outside"
        value={productData.shop_box}
        isInvalid={validationResult.shop_box}
        errorMessage={validationResult.shop_box}
        onChange={(e) =>
          setProductData({ ...productData, shop_box: e.target.value })
        }
      />

      {/* Guarantee in Months */}
      <Input
        type="number"
        label="Guarantee in Months"
        placeholder="Enter guarantee in months"
        labelPlacement="outside"
        value={productData.guarantee_in_months}
        isInvalid={validationResult.guarantee_in_months}
        errorMessage={validationResult.guarantee_in_months}
        onChange={(e) =>
          setProductData({
            ...productData,
            guarantee_in_months: parseInt(e.target.value),
          })
        }
      />

      {/* Add Product Button */}
      <Spacer y={2} />
      <Button onClick={handleAddProduct} auto>
        Add Product
      </Button>
    </div>
  );
};

export default AddProductForm;
