const express = require('express');
const router = express.Router();
const {
    register,
<<<<<<< HEAD
    getBussinessDetails
   } = require('../controller/BussinessRegisterController');

   
 router.post('/', register); 
 router.get('/', getBussinessDetails);    

 module.exports = router;
=======
    getBussinessDetails,
    loginBussiness
  } = require('../controller/BussinessRegisterController');

   
router.post('/', register); 
router.get('/', getBussinessDetails);    
router.post('/login', loginBussiness);

module.exports = router;
>>>>>>> 7de07865f64e44dc5091f0fb6eb98dd878fc4d57
