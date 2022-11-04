const sequelize = require('../../config/db');

const getProducts = async (req, res) => {
  const products = await sequelize.models.products.findAndCountAll();
  return res.status(200).json({ data: products });
};

const createProduct = async (req, res) => {
  const { body } = req;
  const product = await sequelize.models.products.create({
    name: body.name,
    description: body.description,
    price: body.price,
    image: body.image,
  });
  await product.save();
  return res.status(201).json({ data: product })
};

const updateProduct = async (req, res) => {
  const { body, params: { id } } = req;
  const product = await sequelize.models.products.findByPk(id);
  if (!product) {
    return res.status(404).json({ code: 404, message: 'Product not found' });
  }
  const updatedProduct = await product.update({
    name: body.name,
    description: body.description,
    price: body.price,
    image: body.image,
  });
  return res.json({ data: updatedProduct });
};

const deleteProduct = async (req, res) => {
  const { params: { id } } = req;
  const product = await sequelize.models.products.findByPk(id);
  if (!product) {
    return res.status(404).json({ code: 404, message: 'Product not found' });
  }
  await product.destroy();
  return res.json();
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
}
