const express = require('express');
const router = express.Router();
const permission = require('../middlewares/permission');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orders');

// Get all orders
router.get('/', getOrders);
router.get('/:id', permission('admin'), getOrder);
// Create a new order
router.post('/', createOrder);
// Update a order by id
router.put('/:id', updateOrder);
// Delete a Order by id
router.delete('/:id', permission('admin', 'client'), deleteOrder);


module.exports = router;
