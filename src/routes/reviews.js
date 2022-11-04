const express = require('express');
const router = express.Router();

const {
  getReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviews')

// Get all reviews
router.get('/', getReviews);
// Creating a new review
router.post('/', createReview);
// Update a review by id
router.put('/:id', updateReview);
// Delete a review by id
router.delete('/:id', deleteReview);

module.exports = router;
