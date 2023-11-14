// db.js
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://usman1234:03464482176@syedusman.hanffge.mongodb.net/"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
