const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { isAuthenticated } = require('../middleware/authenticate');
const { userValidationRules, validate } = require('../middleware/validate');

// Public routes
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getSingleUser);

// Protected routes with validation
router.post(
  '/',
  isAuthenticated,
  userValidationRules(),
  validate,
  usersController.createUser
);

router.put(
  '/:id',
  isAuthenticated,
  userValidationRules(),
  validate,
  usersController.updateUser
);

router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;