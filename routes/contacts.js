const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");
const { isAuthenticated } = require("../middleware/authenticate");
const { contactValidationRules, validate } = require("../middleware/validate");

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getSingle);

// For the purpose of this assignment, we will use the 'userValidationRules' for contacts as they are similar.
// In a real-world app, you might create 'contactValidationRules'.
router.post(
  "/",
  // isAuthenticated, // Temporarily disabled for Part 1
  contactValidationRules(),
  validate,
  contactsController.createContact
);
router.put(
  "/:id",
  // isAuthenticated, // Temporarily disabled for Part 1
  contactValidationRules(),
  validate,
  contactsController.updateContact
);
router.delete("/:id", /* isAuthenticated, */ contactsController.deleteContact); // Temporarily disabled for Part 1

module.exports = router;
