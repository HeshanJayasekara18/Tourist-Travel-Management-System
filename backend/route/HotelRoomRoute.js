const express = require('express');
const router = express.Router();
const {
    getAllHotelRoom,
    getHotelRoom,
    addHotelRoom,
    updateHotelRoom,
    deleteHotelRoom
  } = require('../controller/HotelRoomController');

router.get('/', getAllHotelRoom);
router.get('/:id', getHotelRoom);    
router.post('/', addHotelRoom);      
router.put('/:id', updateHotelRoom); 
router.delete('/:id', deleteHotelRoom); 

module.exports = router;