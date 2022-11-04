const express = require('express');
const router = express.Router();
const sequelize = require('../../config/db');

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products');


// Get all products
router.get('/', getProducts);
// Create a new product
router.post('/', createProduct);
// Update a product by id
router.put('/:id', updateProduct);
// Delete a product by id
router.delete('/:id', deleteProduct);


module.exports = router;
