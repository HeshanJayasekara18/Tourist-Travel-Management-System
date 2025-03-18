const express = require('express');
const router = express.Router();
const {
    getAllVehicle,
    getVehicle,
    addVehicle,
    updateVehicle,
    deleteVehicle
  } = require('../controller/VehicleController');

router.get('/', getAllVehicle);
router.get('/:id', getVehicle);    
router.post('/', addVehicle);      
router.put('/:id', updateVehicle); 
router.delete('/:id', deleteVehicle); 

module.exports = router;