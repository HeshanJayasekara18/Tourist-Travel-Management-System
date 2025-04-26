// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controller/feedbackController');

// POST /api/feedback
router.post('/', feedbackController.submitFeedback);

module.exports = router;
