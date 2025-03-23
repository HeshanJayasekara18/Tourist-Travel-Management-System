const User = require ('../model/User');
const Tourist = require ('../model/Tourist'); 
const Tour = require ('../model/Tour');
const Booking = require ('../model/Booking');
const User = require('../model/User');

const Touristregister = async (req, res) => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered. Please use a different email." });
        }

        // Create User
        const user = await User.create({          
            username: req.body.email,
            password: req.body.password, 
            role: req.body.role,
            email: req.body.email
        });

        // Create Tourist
        const tourist = await Tourist.create({
            fullname: req.body.fullName,
            userAddress: req.body.userAddress,
            contact: req.body.contact,
            userID: user.userID
        });

        res.status(201).json({
            message: "User and Tourist created successfully", 
            user, 
            tourist
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTouristDetails = async (req, res) => {
    try {
        const { TtouristID_Id } = req.query;      
        const tourist = await Tourist.findOne({ touristID: touristID });
        if (!tourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }

        const usertourist= await User.findOne({ userID: tourist.userID });
        if (!usertourist) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ 
            tourist:"Tourist Details retrived successfully",
            tourist,
            usertourist
         });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { Touristregister, getTouristDetails };