const mongoose = require ('mongoose');
const { v4: uuidv4 } = require('uuid');

const BookingSchema = mongoose.Schema({
    bookingID: { type: String, required: true, unique: true,default: uuidv4 },
    booking_type:{type:String,required:true},
    booking_date:{type:Number,required:true},
    booking_time:{type:Number,required:true},
    Start_date:{type:String,required:true},
    end_date:{type:Number,required:true},
    mobile_number: { type: Number, required: true },

    payID: { type: String, required: true},
    tourID: { type: String, required: true},
    touristID: { type: String, required: true},
});

const Booking = mongoose.model("Booking",BookingSchema);

module.exports = Booking; 
