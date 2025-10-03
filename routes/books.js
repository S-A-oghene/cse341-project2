const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");
const { isAuthenticated } = require("../middleware/authenticate");
const { bookValidationRules, validate } = require("../middleware/validate");

// Public routes
router.get("/", booksController.getAllBooks);
router.get("/:id", booksController.getSingleBook);

// Protected routes with validation
router.post(
  "/",
  // isAuthenticated, // Temporarily disabled for Part 1
  bookValidationRules(),
  validate,
  booksController.createBook
);

router.put(
  "/:id",
  // isAuthenticated, // Temporarily disabled for Part 1
  bookValidationRules(),
  validate,
  booksController.updateBook
);

router.delete("/:id", /* isAuthenticated, */ booksController.deleteBook); // Temporarily disabled for Part 1

module.exports = router;
