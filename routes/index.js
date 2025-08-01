const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/users', require('./users'));
router.use('/books', require('./books'));



module.exports = router;
