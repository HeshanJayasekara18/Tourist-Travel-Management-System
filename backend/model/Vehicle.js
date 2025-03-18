const mongoose = require ('mongoose');
const { v4: uuidv4 } = require('uuid');

const VehicleSchema = mongoose.Schema({
    V_Id: { type: String, required: true, unique: true,default: uuidv4 },
    B_Id: { type: String, required: true },
    name: { type: String, required: true },
    seat: { type: Number, required: true },
    fuel: { type: String, required: true },
    transmission: { type: String, required: true },
    door: { type: Number, required: true },
    availability: { type: String, required: true },
    price_day: { type: Number, required: true },
    price_month: { type: Number, required: true },
    image: { type: String, required: true },
});

const Vehicle = mongoose.model("Vehicle",VehicleSchema);

module.exports = Vehicle; 
