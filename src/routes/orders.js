const express = require('express');
const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
} = require('../controllers/orders');

// Get all orders
router.get('/', getOrders);
// Create a new order
router.post('/', createOrder);
// Update a order by id
router.put('/:id', updateOrder);
// Delete a Order by id
router.delete('/:id', deleteOrder);


module.exports = router;
