const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("username").isString().notEmpty().withMessage("Username is required."),
    body("email").isEmail().withMessage("A valid email is required."),
    body("fullName")
      .isString()
      .notEmpty()
      .withMessage("Full name is required."),
  ];
};

// Renaming for clarity, as this is used for the contacts collection
const contactValidationRules = () => {
  return [
    body("firstName")
      .isString()
      .notEmpty()
      .withMessage("First name is required."),
    body("lastName")
      .isString()
      .notEmpty()
      .withMessage("Last name is required."),
    body("email").isEmail().withMessage("A valid email is required."),
    body("favoriteColor").optional().isString(),
    body("birthday")
      .optional()
      .isISO8601()
      .withMessage("Birthday must be a valid date in YYYY-MM-DD format."),
  ];
};

const bookValidationRules = () => {
  return [
    body("title")
      .isString()
      .notEmpty()
      .withMessage("Title is required and must be a string."),
    body("author")
      .isString()
      .notEmpty()
      .withMessage("Author is required and must be a string."),
    body("publicationYear")
      .isInt({ min: 1000, max: new Date().getFullYear() })
      .withMessage("A valid publication year is required."),
    body("isbn").isISBN().withMessage("A valid ISBN is required."),
    body("genre").optional().isString(),
    body("pages").optional().isInt({ min: 1 }),
    body("summary").optional().isString(),
    body("language").optional().isString(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors
    .array()
    .map((err) => ({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  contactValidationRules, // Exporting the renamed rules
  bookValidationRules, // Keeping book rules as they are
  validate,
};
