const mongoose = require ('mongoose');
const { v4: uuidv4 } = require('uuid');

const TourSchema = mongoose.Schema({
    tourID: { type: String, required: true, unique: true,default: uuidv4 },
    destination: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    
});

const Tour = mongoose.model("Tour",TourSchema);

module.exports = Tour; 