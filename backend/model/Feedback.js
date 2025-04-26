const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  tourPackage: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  feedback: {
    type: String,
    required: true
  },
  recommend: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  visitDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
