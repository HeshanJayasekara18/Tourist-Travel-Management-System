const express = require('express');
const router = express.Router();
const {
    getAllBooking,
    getBooking,
    addBooking,
    updateBooking,
    deleteBooking,
    generateReport
  } = require('../controller/BookingController');

router.get('/', getAllBooking);
router.get('/:id', getBooking);    
router.post('/', addBooking);      
router.put('/:id', updateBooking); 
router.delete('/:id', deleteBooking); 
router.post('/report', generateReport); 

module.exports = router;