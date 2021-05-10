// Load packages
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize server;
require("dotenv").config();
const mongoURL = process.env.DATABASE_URI;

const app = express();
app.use(formidable());
app.use(cors());

// Connect to the database
mongoose.connect(`${mongoURL}/BifrostTest`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Load routes
const product = require("./routes/product");
app.use(product);

// Get all non-existent routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "Ressource not found" });
});

// Launch server
app.listen(process.env.PORT, () => {
  console.log("Server launched");
});
