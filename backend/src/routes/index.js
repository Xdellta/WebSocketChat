const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const chatRoute = require('./chatRoute');

router.use('/auth', authRoute);
router.use('/chat', chatRoute);

module.exports = router;