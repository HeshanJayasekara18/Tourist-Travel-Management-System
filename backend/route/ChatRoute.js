const express = require('express');
const router = express.Router();
const { saveChat, getChatByUserBooking } = require('../controller/ChatController');


router.post('/', saveChat);
router.get('/', getChatByUserBooking);

module.exports = router;
