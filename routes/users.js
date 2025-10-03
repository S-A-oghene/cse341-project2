const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const usersController = require("../controllers/users");
const validation = require("../middleware/validate");

// Validation rules for creating/updating a user
const userValidationRules = () => {
  return [
    body("username", "Username is required and must be a string")
      .notEmpty()
      .isString(),
    body("email", "A valid email is required").notEmpty().isEmail(),
    body("fullName", "Full name is required and must be a string")
      .notEmpty()
      .isString(),
  ];
};

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getSingleUser);
router.post(
  "/",
  userValidationRules(),
  validation.handleValidation,
  usersController.createUser
);
router.put(
  "/:id",
  userValidationRules(),
  validation.handleValidation,
  usersController.updateUser
);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
