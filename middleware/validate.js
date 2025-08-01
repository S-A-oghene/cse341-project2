const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    body('firstName').isString().notEmpty().withMessage('First name is required.'),
    body('lastName').isString().notEmpty().withMessage('Last name is required.'),
    body('email').isEmail().withMessage('Must be a valid email address.'),
    body('favoriteColor').isString().notEmpty().withMessage('Favorite color is required.'),
    body('birthday').isISO8601().toDate().withMessage('Birthday must be a valid date.'),
  ];
};

const bookValidationRules = () => {
  return [
    body('title').isString().notEmpty().withMessage('Title is required.'),
    body('author').isString().notEmpty().withMessage('Author is required.'),
    body('publicationYear').isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('Publication year must be a valid year.'),
    body('genre').isString().notEmpty().withMessage('Genre is required.'),
    body('isbn').isISBN().withMessage('Must be a valid ISBN.'),
    body('pages').isInt({ min: 1 }).withMessage('Pages must be a positive number.'),
    body('summary').isString().notEmpty().withMessage('Summary is required.'),
    body('language').optional().isString().withMessage('Language must be a string.'),
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
