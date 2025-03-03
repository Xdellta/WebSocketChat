const express = require('express');
const router = express.Router();
const { getChatHistory } = require('../controllers/chatController');

router.get('/getChatHistory', getChatHistory);

module.exports = router;