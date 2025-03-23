const express = require('express');
const router = express.Router();

const {
    Touristregister,
    getTouristDetails
  } = require('../controller/TouristRegisterController');

   
router.post('/', Touristregister); 
router.get('/', getTouristDetails);    

module.exports = router;