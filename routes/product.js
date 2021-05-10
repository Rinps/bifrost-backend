const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Product = require("../models/Product");

// *C*RUD
// Create a new product in the database. Require these BODY parameters: "name" (String), "brand" (String), "price" (Number). Can also accept this BODY parameter: "stock" (Number).
router.post("/product/create", async (req, res) => {
  try {
    const { name, brand, price, quantity } = req.fields;

    // Checks if mandatory parameters are in the request.
    if (name && brand && price) {
      // Check if this product already exists in the database.
      const existingProduct = await Product.findOne({ name, brand });
      if (existingProduct === null) {
        const newProduct = new Product({ name, brand, price, quantity });
        // If the stock parameter hasn't been input, we put the quantity to 0.
        if (!quantity) {
          newProduct.quantity = 0;
        }

        // Now we just have to save the product in the database and tell the user the operation was successfull
        await newProduct.save();
        res.status(200).json({ message: "New item added to the store." });
      } else [res.status(400).json({ message: "This product already exists" })];
    } else {
      res.status(412).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// C*R*UD
// Return the entire database content to the user.
router.get("/product/readAll", async (req, res) => {
  try {
    const productsArray = await Product.find();
    res.status(200).json(productsArray);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// C*R*UD
// Read a single product's data. Require at least one of these QUERY parameters: "id" (MongoDB ID) or "name" (String) and "brand" (String).
router.get("/product/read", async (req, res) => {
  try {
    const { id, name, brand } = req.query;
    // Checks wether we have an id or the name and brand.
    if (id) {
      // Checks wether a product with this id exists.
      const product = await Product.findById(id);
      if (product) {
        // If it does, simply send it to the user
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } else if (name && brand) {
      // Checks wether a product with this name and brand exist.
      const product = await Product.findOne({ name, brand });
      if (product) {
        // If it does, simply send it to the user
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// CR*U*D
// Update a product's properties. Require this BODY parameters: "id" (MongoDB ID), as well as at least one of these BODY parameters: "name" (String), "brand" (String), "price" (Number), quantity (Number).
router.put("/product/update", async (req, res) => {
  try {
    const { id, name, brand, price, quantity } = req.fields;
    const product = await Product.findById(id);

    // Checks if the id exists in the database.
    if (product) {
      // Only process if at least one optional parameter has been given.
      if (name || brand || price || quantity) {
        // We're going to iterate through every parameter and progressively update the product.
        const newObjectKeys = [{ name }, { brand }, { price }, { quantity }];
        newObjectKeys.map((item) => {
          // For each parameter, get its name...
          const key = Object.keys(item)[0];
          // And check wether it contain data.
          if (item[key]) {
            // If it does, update the matching product property
            product[key] = item[key];
          }
        });

        // Now, simply save the newest product's version.
        await product.save();
        res.status(200).json(product);
      } else {
        res.status(200).json({
          message:
            "You don't seem to want to do anything with this product, please leave him alone!",
        });
      }
    } else {
      res.status(404).json({ message: "No product found with this id" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// CRU*D*
// Delete a product. Require a QUERY parameter : "id" (MongoDB String)
router.delete("/product/delete", async (req, res) => {
  try {
    const { id } = req.query;
    const product = await Product.findById(id);

    // Check wether the id exists and if it matches a product.
    if (product) {
      await product.deleteOne();
      res.status(200).json({ message: "Product successfully removed" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
