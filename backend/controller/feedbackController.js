const Feedback = require('../model/Feedback');
const Tourist = require('../model/Tourist'); 

// Submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { serviceType, touristID, rating, comment } = req.body;

    // Validate touristID
    const touristExists = await Tourist.findById(touristID);
    if (!touristExists) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    const newFeedback = new Feedback({
      serviceType,
      touristID,
      rating,
      comment
    });

    await newFeedback.save();
    

    return res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
