const TourGuide = require('../model/TourGuide');

// Create a new tour guide
exports.createTourGuide = async (req, res) => {
  try {
    const data = req.body;

    const newGuide = new TourGuide(data);
    await newGuide.save();

    res.status(201).json({ success: true, message: 'Tour guide added!', data: newGuide });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all tour guides
exports.getAllTourGuides = async (req, res) => {
  try {
    const guides = await TourGuide.find();
    res.status(200).json({ success: true, data: guides });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single tour guide by ID
exports.getTourGuideById = async (req, res) => {
  try {
    const guide = await TourGuide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ success: false, message: 'Tour guide not found' });
    }

    res.status(200).json({ success: true, data: guide });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a tour guide
exports.updateTourGuide = async (req, res) => {
  try {
    const updatedGuide = await TourGuide.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedGuide) {
      return res.status(404).json({ success: false, message: 'Tour guide not found' });
    }

    res.status(200).json({ success: true, message: 'Tour guide updated', data: updatedGuide });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a tour guide
exports.deleteTourGuide = async (req, res) => {
  try {
    const deletedGuide = await TourGuide.findByIdAndDelete(req.params.id);

    if (!deletedGuide) {
      return res.status(404).json({ success: false, message: 'Tour guide not found' });
    }

    res.status(200).json({ success: true, message: 'Tour guide deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

