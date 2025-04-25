const User = require('../model/User');
const BussinessAgent = require('../model/BussinessAgent');
const Bussiness = require('../model/Bussiness');    


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });

        console.log("USER DETAILS", user);

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Find the BussinessAgent associated with the user
        const businessAgent = await BussinessAgent.findOne({ userID: user.userID });

        if (!businessAgent) {
            return res.status(404).json({ message: "Business agent not found" });
        }

        // Find the Bussiness details using the BA_Id from the BussinessAgent
        const business = await Bussiness.findOne({ BA_Id: businessAgent.BA_Id });

        if (!business) {
            return res.status(404).json({ message: "Business details not found" });
        }

        // Send the response with both User and Business details
        res.status(200).json({
            message: "Login successful",
            userDetails: {
                userID: user.userID,
                username: user.username,
                role: user.role,
                email: user.email,
            },
            businessDetails: {
                B_Id: business.B_Id,
                businessName: business.businessName,
                businessAddress: business.businessAddress,
                description: business.description,
                bussinessType: business.bussinessType,              
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { login };

