// routes/tourGuideRoutes.js
const express = require('express');
const router = express.Router();
const GuideProfileController = require('../controller/GuideProfileController');
const upload = require("../middleware/upload");
// Get dashboard statistics
router.get('/', GuideProfileController.getDashboardStats);

// Create a new tour guide profile
router.post('/profile', upload.single("profileImage") ,GuideProfileController.createProfile);

// Get a specific tour guide profile by ID
router.get('/profile/:guideId', GuideProfileController.getProfileByGuideId); 
router.put('/profile/:guideId', upload.single("profileImage"), GuideProfileController.updateProfile);
router.delete('/profile/:guideId', GuideProfileController.deleteProfile);
router.get('/all-profiles', GuideProfileController.getAllProfiles);


module.exports = router;