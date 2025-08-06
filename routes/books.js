const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { isAuthenticated } = require('../middleware/authenticate');
const { bookValidationRules, validate } = require('../middleware/validate');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSingleBook);
router.post(
  '/',
  isAuthenticated,
  bookValidationRules(),
  validate,
  booksController.createBook
);
router.put(
  '/:id',
  isAuthenticated,
  bookValidationRules(),
  validate,
  booksController.updateBook
);
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;