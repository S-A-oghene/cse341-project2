const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const contactsController = require("../controllers/contacts");
const validation = require("../middleware/validate");

const contactValidationRules = () => {
	return [
		body("firstName", "First name is required").notEmpty().isString(),
		body("lastName", "Last name is required").notEmpty().isString(),
		body("email", "A valid email is required").notEmpty().isEmail(),
		body("favoriteColor", "Favorite color is required").notEmpty().isString(),
		body("birthday", "Birthday is required").notEmpty().isISO8601().toDate(),
	];
};

router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getSingleContact);
router.post("/", contactValidationRules(), validation.handleValidation, contactsController.createContact);
router.put("/:id", contactValidationRules(), validation.handleValidation, contactsController.updateContact);
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
