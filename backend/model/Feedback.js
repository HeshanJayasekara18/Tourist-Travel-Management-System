const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const feedbackSchema = new mongoose.Schema({
  F_Id: { type: String, required: true, unique: true, default: uuidv4 },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  tourPackage: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: { type: String, required: true },
  images: [String],
  recommend: { type: String, enum: ['Yes', 'No'], required: true },
  visitDate: { type: Date, required: true },
  location: { type: String, required: true },
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
