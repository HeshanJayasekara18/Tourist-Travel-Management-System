const Feedback = require('../model/Feedback');
const Tourist = require('../model/Tourist');
const mongoose = require('mongoose');

// Create feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { serviceType, touristID, rating, comment } = req.body;
    
    try {
      // Check if tourist exists - Look up by touristID field, not by _id
      const touristExists = await Tourist.findOne({ touristID: touristID });
      if (!touristExists) {
        return res.status(404).json({ message: 'Tourist not found' });
      }
      
      // Create new feedback
      const newFeedback = new Feedback({
        serviceType,
        touristID: touristExists._id, // Use the MongoDB _id from the found tourist
        rating,
        comment
      });
  
      await newFeedback.save();
      return res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
    } catch (dbError) {
      console.error('Database operation error:', dbError);
      return res.status(500).json({ message: 'Database operation failed', error: dbError.message });
    }
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('touristID', 'fullName email'); // populate tourist basic info
    return res.status(200).json({ feedbacks });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get single feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id).populate('touristID', 'fullName email');

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    return res.status(200).json({ feedback });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    if (rating !== undefined) feedback.rating = rating;
    if (comment !== undefined) feedback.comment = comment;

    await feedback.save();

    return res.status(200).json({ message: 'Feedback updated successfully', feedback });
  } catch (error) {
    console.error('Error updating feedback:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    return res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Respond to feedback
exports.respondToFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminResponse } = req.body;

    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    feedback.adminResponse = adminResponse;
    await feedback.save();

    res.status(200).json({ message: 'Response submitted successfully', feedback });
  } catch (error) {
    console.error('Error responding to feedback:', error);
    res.status(500).json({ message: 'Server error while responding to feedback' });
  }
};

// Get feedback response
exports.getFeedbackResponse = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({
      feedbackId: feedback._id,
      touristComment: feedback.comment, 
      adminResponse: feedback.adminResponse || "No response yet",
    });
  } catch (error) {
    console.error('Error getting feedback response:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all feedbacks for a specific tourist
exports.getTouristFeedbacks = async (req, res) => {
  try {
    const { touristId } = req.params;
    
    // Find the tourist by touristID (not MongoDB _id)
    const tourist = await Tourist.findOne({ touristID: touristId });
    
    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }
    
    // Find all feedbacks where touristID matches the MongoDB _id of the found tourist
    const feedbacks = await Feedback.find({ touristID: tourist._id }).sort({ date: -1 });
    
    return res.status(200).json({ feedbacks });
  } catch (error) {
    console.error('Error fetching tourist feedbacks:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};