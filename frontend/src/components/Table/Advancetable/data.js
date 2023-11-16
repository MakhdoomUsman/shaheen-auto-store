const columns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "Product Name", uid: "product_name", sortable: true },
  { name: "Unit", uid: "unit", sortable: true },
  { name: "SKU", uid: "sku", sortable: true },
  { name: "Stock limit", uid: "minimum_quantity", sortable: true },
  { name: "Quantity", uid: "quantity" },
  { name: "Disc", uid: "disc" },
  { name: "Tax", uid: "tax", sortable: true },
  { name: "Discount Type", uid: "discount_type" },
  { name: "Discount", uid: "discount", sortable: true },
  { name: "Profit Type", uid: "profit_type" },
  { name: "Profit", uid: "profit", sortable: true },
  { name: "Buying Price", uid: "price", sortable: true },
  { name: "Selling Price", uid: "selling_price", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Shop Box", uid: "shop_box" },
  { name: "Guarantee Type", uid: "guarantee_type" },
  { name: "Guarantee in Months", uid: "guarantee_in_months", sortable: true },
  { name: "Created At", uid: "createdAt", sortable: true },
  { name: "Updated At", uid: "updatedAt", sortable: true },
  { name: "Product #", uid: "__v" },
  { name: "ACTIONS", uid: "actions" },
];

const users = [
  {
    _id: "6554b64164e42e02cd86f912",
    product_name: "bearing",
    unit: "bearing",
    sku: "bearing",
    minimum_quantity: 34,
    quantity: "3",
    disc: "bearing",
    tax: 2,
    discount_type: "2",
    discount: 3,
    profit_type: "bearing",
    profit: 34,
    price: 45,
    selling_price: 34,
    status: "active",
    images: [],
    shop_box: "bearing",
    guarantee_type: "day",
    guarantee_in_months: 3,
    createdAt: "2023-11-15T12:14:57.441Z",
    updatedAt: "2023-11-15T12:14:57.441Z",
    __v: 0,
  },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export { columns, users, statusOptions };
