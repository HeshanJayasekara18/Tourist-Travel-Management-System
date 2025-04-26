const express = require('express');
const router = express.Router();
const { registerTourGuide, loginTourGuide } = require('../controller/TourGuideController');

router.post('/register', registerTourGuide);
router.post('/login', loginTourGuide);

module.exports = router;