const Feedback = require('../model/Feedback');

// Create feedback
exports.createFeedback = async (req, res) => {
  try {
    console.log('Request received:', req.body); // Check request body
    const { fullName, email, tourPackage, rating, feedback, recommend, visitDate, location } = req.body;

    const imagePaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const newFeedback = new Feedback({
      fullName,
      email,
      tourPackage,
      rating,
      feedback,
      recommend,
      visitDate,
      location,
      images: imagePaths
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback created successfully.', feedback: newFeedback });
  } catch (error) {
    console.error('Error creating feedback:', error); // Log the error
    res.status(500).json({ error: 'Failed to create feedback.' });
  }
};

// Read all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve feedbacks.' });
  }
};

// Read single feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ error: 'Feedback not found.' });

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve feedback.' });
  }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
  try {
    const { feedbackText, rating } = req.body;

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { feedbackText, rating },
      { new: true }
    );

    if (!updatedFeedback) return res.status(404).json({ error: 'Feedback not found.' });

    res.status(200).json({ message: 'Feedback updated successfully.', feedback: updatedFeedback });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update feedback.' });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) return res.status(404).json({ error: 'Feedback not found.' });

    res.status(200).json({ message: 'Feedback deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete feedback.' });
  }
};
