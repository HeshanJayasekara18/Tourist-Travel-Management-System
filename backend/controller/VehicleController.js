const Vehicle = require ('../model/Vehicle');


const getAllVehicle = async (req,res) => {
    try{
        const vehicles = await Vehicle.find({});
        res.status(200).json(vehicles);
    }catch(error){
        res.status(500).jason({ message: error.message });
    }
}

const getVehicle = async (req,res) => {
    try{
        const { V_Id } = req.params.id;
        const vehicle = await Vehicle.findOne({ V_Id: V_Id });
        res.status(200).jason(vehicle);

    }catch (error){
        res.status(500).json ({message:error.message});
    }
}

const addVehicle = async (req,res) => {
    try{
        const vehicle = await Vehicle.create(req.body);
        res.status(200).json(vehicle);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const updateVehicle = async (req,res) => {
    const V_Id = req.params.id; 
    const body = req.body; 
    try{
        const updateVehicle = await Vehicle.findOneAndUpdate(
            { V_Id: V_Id },
            body,
            { new: true, runValidators: true } 
          );
        res.status(200).json(updateVehicle);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
const deleteVehicle = async (req,res) => {
    const V_Id = req.params.id;  
    try{
        const deleteVehicle = await Vehicle.findOneAndDelete({ V_Id: V_Id });
        res.status(200).json(deleteVehicle);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    getAllVehicle,
    getVehicle,
    addVehicle,
    updateVehicle,
    deleteVehicle
};