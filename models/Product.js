const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  name: String,
  brand: String,
  price: Number,
  quantity: Number,
});

module.exports = Product;
