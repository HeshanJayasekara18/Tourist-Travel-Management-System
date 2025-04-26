const User = require ('../model/User');
const Tourist = require ('../model/Tourist'); 
const Tour = require ('../model/Tour');
const Booking = require ('../model/Booking');


const Touristregister = async (req, res) => {
    try {
        const { fullname, email, password, country, mobile_number } = req.body;
      
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered. Please use a different email." });
        }

        const user = await User.create({
            username: email,
            password: password,
            role: 'Tourist',
            email
        });

        // Create Tourist
        const tourist = await Tourist.create({
            username: email,
            fullname: fullname,
            email,
            country,
            mobile_number,
            password: password,
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