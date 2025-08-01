const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { userValidationRules, validate } = require('../middleware/validate');

// GET all users
router.get('/', usersController.getAllUsers);

// GET a single user by ID
router.get('/:id', usersController.getSingleUser);

// POST a new user
router.post('/', userValidationRules(), validate, usersController.createUser);

// PUT to update a user by ID
router.put('/:id', userValidationRules(), validate, usersController.updateUser);

// DELETE a user by ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;
