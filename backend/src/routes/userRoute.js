const express = require('express');
const router = express.Router();
const { login } = require('../controlers/authController');

router.get('/login', login);

module.exports = router;