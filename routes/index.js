const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // #swagger.ignore = true
  res.redirect('/api-docs');
});

router.use('/api-docs', require('./swagger'));
router.use('/users', require('./users'));
router.use('/books', require('./books'));



module.exports = router;
