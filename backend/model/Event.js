const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventCategory: { type: String, required: true },
  eventDescription: { type: String, required: true },
  imagePreview: { type: String }, // URL or base64 string
  venue: { type: String, required: true },
  startDateTime: { type: Date, required: true },
  ticketPrice: { type: String, default: 'Free' },
  organizerContact: { type: String, required: true },
  websiteLink: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);