const Booking = require('../model/Booking');

const getAllBooking = async (req, res) => {
    try {
        const bookings = await Booking.find({}); // Renamed variable to 'bookings'
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBooking = async (req, res) => {
    try {
        const bookingID = req.params.id; // Fixed destructuring issue
        const booking = await Booking.findOne({ bookingID: bookingID }); // Renamed variable to 'booking'
        res.status(200).json(booking); // Fixed typo: jason -> json
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addBooking = async (req, res) => {
    try {
        const newBooking = await Booking.create(req.body); // Renamed variable to 'newBooking'
        res.status(200).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBooking = async (req, res) => {
    const bookingID = req.params.id;
    const body = req.body;
    try {
        const updatedBooking = await Booking.findOneAndUpdate(
            { bookingID: bookingID },
            body,
            { new: true, runValidators: true }
        ); // Renamed variable to 'updatedBooking'
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBooking = async (req, res) => {
    const bookingID = req.params.id; // Fixed typo: 'constbookingID' -> 'const bookingID'
    try {
        const deletedBooking = await Booking.findOneAndDelete({ bookingID: bookingID }); // Fixed variable and query
        res.status(200).json(deletedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBooking,
    getBooking,
    addBooking,
    updateBooking,
    deleteBooking
};