const mongoose = require ('mongoose');
const { v4: uuidv4 } = require('uuid');

const TouristSchema = mongoose.Schema({
    touristID: { type: String, required: true, unique: true,default: uuidv4 },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    mobile_number: { type: Number, required: true },
    password: { type: String, required: true },
    
    userID: { type: String, required: true},
});

const Tourist = mongoose.model("Tourist",TouristSchema);

module.exports = Tourist; 
