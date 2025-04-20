const express = require('express');
const router = express.Router();
const {
    register,
    getBussinessDetails
<<<<<<< HEAD
  } = require('../controller/BussinessRegisterController');

   
router.post('/', register); 
router.get('/', getBussinessDetails);    

module.exports = router;
=======
   } = require('../controller/BussinessRegisterController');

   
 router.post('/', register); 
 router.get('/', getBussinessDetails);    

 module.exports = router;
>>>>>>> a30c8ce7eded64be38631add8603f2227c5d46e8
