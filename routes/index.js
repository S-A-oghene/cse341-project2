const express = require('express');
const router = express.Router();

// Specific routes
router.use('/auth', require('./auth'));
router.use('/api-docs', require('./swagger'));
router.use('/users', require('./users'));
router.use('/books', require('./books'));

// Root route should be last
router.get('/', (req, res) => {
  // #swagger.ignore = true
  res.redirect('/api-docs');
});

module.exports = router;
