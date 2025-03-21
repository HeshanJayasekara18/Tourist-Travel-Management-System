const express = require('express');
const router = express.Router();
const {
    getAllBooking,
    getBooking,
    addBooking,
    updateBooking,
    deleteBooking
  } = require('../controller/BookingController');

router.get('/', getAllBooking);
router.get('/id', getBooking);    
router.post('/', addBooking);      
router.put('/id', updateBooking); 
router.delete('/id', deleteBooking); 

module.exports = router;