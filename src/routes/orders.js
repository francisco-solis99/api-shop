const express = require('express');
const router = express.Router();
const sequelize = require('../../config/db');

// Get all orders
router.get('/', async (req, res) => {
  const orders = await sequelize.models.orders.findAndCountAll();
  return res.status(200).json({ data: orders });
});

// Create a new order
router.post('/', async (req, res) => {
  const { body } = req;
  const order = await sequelize.models.orders.create({
    productId: body.productId,
    userId: body.userId,
    quantity: body.quantity
  });
  await order.save();
  return res.status(201).json({ data: order })
});

// Update a order by id
router.put('/:id', async (req, res) => {
  const { body, params: { id } } = req;
  const order = await sequelize.models.orders.findByPk(id);
  if (!order) {
    return res.status(404).json({ code: 404, message: 'Order not found' });
  }
  const updatedOrder = await order.update({
    productId: body.productId,
    userId: body.userId,
    quantity: body.quantity
  });
  return res.json({ data: updatedOrder });
});

// Delete a Order by id
router.delete('/:id', async (req, res) => {
  const { params: { id } } = req;
  const order = await sequelize.models.orders.findByPk(id);
  if (!order) {
    return res.status(404).json({ code: 404, message: 'Order not found' });
  }
  await order.destroy();
  return res.json();
});


module.exports = router;
