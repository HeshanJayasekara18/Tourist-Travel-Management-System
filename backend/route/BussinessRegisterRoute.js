const express = require('express');
const router = express.Router();
const {
    register,
    getBussinessDetails
   } = require('../controller/BussinessRegisterController');

   
 router.post('/', register); 
 router.get('/', getBussinessDetails);    

 module.exports = router;
