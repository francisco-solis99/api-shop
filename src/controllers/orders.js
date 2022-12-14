const sequelize = require('../../config/db');

const getOrders = async (req, res) => {
  const orders = await sequelize.models.orders.findAndCountAll();
  return res.status(200).json({ data: orders });
};

const getOrder = async (req, res) => {
  const {id} = req.params;
  const order = await sequelize.models.orders.findOne({
    where: { id },
    // include: sequelize.models.users
    // include: [
    //   sequelize.models.users,
    //   sequelize.models.products
    // ],
    include: [
      {
        model: sequelize.models.users,
        attributes: ['name', 'maternalSurname']
      },
      {
        model: sequelize.models.products,
        attributes: ['id', 'name', 'price']
      }
    ]
  });
  return res.status(200).json({ data: order });
};

const createOrder = async (req, res) => {
  const { body } = req;
  const order = await sequelize.models.orders.create({
    productId: body.productId,
    userId: body.userId,
    quantity: body.quantity
  });
  await order.save();
  return res.status(201).json({ data: order })
};

const updateOrder = async (req, res) => {
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
};

const deleteOrder = async (req, res) => {
  const { params: { id } } = req;
  const order = await sequelize.models.orders.findByPk(id);
  if (!order) {
    return res.status(404).json({ code: 404, message: 'Order not found' });
  }
  await order.destroy();
  return res.json();
}

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder
}
