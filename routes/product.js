// routes/product.js
const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Add a product
router.post('/', async (req, res) => {
  const { name, description, price, image } = req.body;

  const newProduct = new Product({
    name,
    description,
    price,
    image,
  });

  try {
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Update a product (including image URL)
router.put('/:id', async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image },
      { new: true } // This option returns the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

module.exports = router;
