const express = require('express');
const router = express.Router();
const {
    getAllHotelRoom,
    getHotelRoom,
    addHotelRoom,
    updateHotelRoom,
    deleteHotelRoom
  } = require('../controller/HotelRoomController');

 const upload = require("../middleware/upload");

router.get('/', getAllHotelRoom);
router.get('/:id', getHotelRoom);    
router.post('/', upload.single("image") ,addHotelRoom);      
router.put('/:id', updateHotelRoom); 
router.delete('/:id', deleteHotelRoom); 

module.exports = router;