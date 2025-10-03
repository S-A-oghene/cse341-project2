const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");
const { isAuthenticated } = require("../middleware/authenticate");
const { userValidationRules, validate } = require("../middleware/validate");

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getSingle);

// For the purpose of this assignment, we will use the 'userValidationRules' for contacts as they are similar.
// In a real-world app, you might create 'contactValidationRules'.
router.post(
  "/",
  isAuthenticated,
  userValidationRules(),
  validate,
  contactsController.createContact
);
router.put(
  "/:id",
  isAuthenticated,
  userValidationRules(),
  validate,
  contactsController.updateContact
);
router.delete("/:id", isAuthenticated, contactsController.deleteContact);

module.exports = router;
