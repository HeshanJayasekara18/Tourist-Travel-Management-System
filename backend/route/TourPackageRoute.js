const express = require('express');
const router = express.Router();
const {
    createTourPackage,
    getAllTourPackages,
    getTourPackageById,
    updateTourPackage,
    deleteTourPackage


} = require('../controller/TourPackageController');
router.get('/', getAllTourPackages);
router.get('/:id', getTourPackageById);
router.post('/', createTourPackage);
router.put('/:id', updateTourPackage);
router.delete('/:id', deleteTourPackage);
module.exports = router;
//compare this snippet from backend/route/TourPackageRoute.js: