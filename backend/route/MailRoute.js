const express = require('express');
const router = express.Router();
const {
    sendMail
} = require('../controller/MailSendController');
  
router.post('/',sendMail);  

module.exports = router;
