const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    updateFeedback,
    deleteFeedback
} = require('../controller/FeedbackController');

// CREATE - Submit feedback
router.post('/', upload.array('images', 5), createFeedback);

// READ - Get all feedbacks
router.get('/', getAllFeedbacks);

// READ - Get feedback by ID
router.get('/:id', getFeedbackById);

// UPDATE - Update feedback by ID
router.put('/:id', updateFeedback);

// DELETE - Delete feedback by ID
router.delete('/:id', deleteFeedback);

module.exports = router;
