const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const PaymentSchema = mongoose.Schema({
    paymentId: { type: String, required: true, unique: true, default: uuidv4 },
    userID: { type: String, required: true },
    amount: { type: String, required: true, trim: true }, // String to match your requirement
    cardholderName: { type: String, required: true, trim: true },
    cardNumber: { type: String, required: true, trim: true },
    expiryDate: { type: String, required: true, trim: true }, // Format: MM/YY
    cvv: { type: String, required: true, trim: true },
    billingAddress: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },//trim removes white spaces
    state: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, trim: true }
}, { timestamps: true });

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;