const Payment = require('../model/Payment');
// Create a new payment
const createPayment = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body cannot be empty" });
        }
        const payment = new Payment(req.body);
        await payment.save();
        res.status(201).json({ message: "Payment created successfully", payment });
    } catch (error) {
        res.status(400).json({ message: "Error creating payment", error: error.message });
    }
};

// Get all payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving payments", error: error.message });
    }
};

// Get a single payment by ID
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving payment", error: error.message });
    }
};

// Update a payment by ID
const updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json({ message: "Payment updated successfully", payment });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error", error: error.message });
        }
        res.status(400).json({ message: "Error updating payment", error: error.message });
    }
};

// Delete a payment by ID
const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting payment", error: error.message });
    }
};
module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
};
