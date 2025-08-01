const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { bookValidationRules, validate } = require('../middleware/validate');

// GET all books
router.get('/', booksController.getAllBooks);

// GET a single book by ID
router.get('/:id', booksController.getSingleBook);

// POST a new book
router.post('/', bookValidationRules(), validate, booksController.createBook);

// PUT to update a book by ID
router.put('/:id', bookValidationRules(), validate, booksController.updateBook);

// DELETE a book by ID
router.delete('/:id', booksController.deleteBook);

module.exports = router;
