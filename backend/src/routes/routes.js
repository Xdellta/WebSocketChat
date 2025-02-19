const express = require('express');
const router = express.Router();
const chatRoute = require('./chatRoute');

router.use('/chat', chatRoute);

module.exports = router;