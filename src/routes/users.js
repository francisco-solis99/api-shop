const express = require('express');
const router = express.Router();

const {
  getUsers,
  createUser,
  updateUser,
  delateUser
} = require('../controllers/users');

// Get all users
router.get('/', getUsers);
// Create a new user
router.post('/', createUser);
// Update a user by id
router.put('/:id', updateUser);
// Delete a User by id
router.delete('/:id', delateUser);


module.exports = router;
