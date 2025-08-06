const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    body('firstName').isString().notEmpty().withMessage('First name is required.'),
    body('lastName').isString().notEmpty().withMessage('Last name is required.'),
    body('email').isEmail().withMessage('A valid email is required.'),
    body('favoriteColor').optional().isString(),
    body('birthday').optional().isDate().withMessage('Birthday must be a valid date.')
  ];
};

const bookValidationRules = () => {
  return [
    body('title').isString().notEmpty().withMessage('Title is required and must be a string.'),
    body('author').isString().notEmpty().withMessage('Author is required and must be a string.'),
    body('publicationYear').isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('A valid publication year is required.'),
    body('isbn').isISBN().withMessage('A valid ISBN is required.'),
    body('genre').optional().isString(),
    body('pages').optional().isInt({ min: 1 }),
    body('summary').optional().isString(),
    body('language').optional().isString()
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  bookValidationRules,
  validate,
};
