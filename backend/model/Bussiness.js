const mongoose = require ('mongoose');
const { v4: uuidv4 } = require('uuid');

const BussinessSchema = mongoose.Schema({
    B_Id: { type: String, required: true, unique: true,default: uuidv4 },
    BA_Id: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    bussinessType: { type: String, required: true },
    fileUpload1: { type: String, required: true },
});

const Bussiness = mongoose.model("Bussiness",BussinessSchema);//table name

module.exports = Bussiness; 
