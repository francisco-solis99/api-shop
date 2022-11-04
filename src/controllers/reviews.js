const sequelize = require('../../config/db');

const getReviews = async (req, res) => {
  const reviews = await sequelize.models.reviews.findAndCountAll();
  return res.status(200).json({ data: reviews });
};

const createReview = async (req, res) => {
  const { body } = req;
  const review = await sequelize.models.reviews.create({
    content: body.content,
    productId: body.productId,
  });
  await review.save();
  return res.status(201).json({ data: review });
};

const updateReview = async (req, res) => {
  const { body, params: { id } } = req;
  const review = await sequelize.models.reviews.findByPk(id);
  if (!review) {
    return res.status(404).json({ code: 404, message: 'Product not found' });
  }
  const updatedReview = await product.update({
    content: body.content,
    productId: body.productId,
  });
  return res.json({ data: updatedReview });
};

const deleteReview = async (req, res) => {
  const { params: { id } } = req;
  const review = await sequelize.models.reviews.findByPk(id);
  if (!review) {
    return res.status(404).json({ code: 404, message: 'Review not found' });
  }
  await review.destroy();
  return res.json();
};


module.exports = {
  getReviews,
  createReview,
  updateReview,
  deleteReview
}
