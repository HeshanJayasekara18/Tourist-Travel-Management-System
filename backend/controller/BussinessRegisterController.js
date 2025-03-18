const User = require ('../model/User');
const Bussiness = require ('../model/Bussiness'); 
const BussinessAgent = require ('../model/BussinessAgent');


const register = async (req, res) => {
    try {
        const user = await User.create({          
            username: req.body.username,
            password: req.body.password, // Hash the password before saving
            role: req.body.role,
            email: req.body.email
        });

        const bussinessAgent = await BussinessAgent.create({
            fullname: req.body.fullname,
            address: req.body.agentAddress,
            contact: req.body.contact,
            userID: user.userID
        });

        const bussiness = await Bussiness.create({
            BA_Id: bussinessAgent.BA_Id,
            name: req.body.businessName,
            address: req.body.businessAddress,
            description: req.body.description,
            bussinessType: req.body.bussinessType,
            fileUpload1: req.body.fileUpload1
        });

        res.status(201).json({ message: "User, Business Agent, and Business created successfully", user, bussinessAgent, bussiness });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register };
