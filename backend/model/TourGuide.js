const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const tourGuideSchema = new mongoose.Schema({
  guideId: {
    type: String,
    required: true,
    unique: true, 
    default: uuidv4,
  },
  guideName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  age: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String, // store file path or URL
  },
  experience: {
    type: Number,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },

  specializationList: {
    type: [String],
    required: true,
  },

  locations: {
    type: [String],
    required: true,
  },

  availabilityStatus: {
    type: String,
    enum: ['Available', 'Busy', 'On Leave'],
    default: 'Available',
  },
  certifications: {
    type: String, // store file path or URL
  },
}, { timestamps: true });

module.exports = mongoose.model('TourGuide', tourGuideSchema);
