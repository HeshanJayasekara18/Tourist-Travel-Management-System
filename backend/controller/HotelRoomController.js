const HotelRoom = require ("../model/hotelRoom");

const getAllHotelRoom = async (req,res) => {
    try{
        const rooms = await HotelRoom.find({});
        res.status(200).json(rooms);
    }catch(error){
        res.status(500).jason({ message: error.message });
    }
}

const getHotelRoom = async (req,res) => {
    try{
        const { HR_Id } = req.params.id;
        const room = await HotelRoom.findOne({ HR_Id: HR_Id });
        res.status(200).jason(room);

    }catch (error){
        res.status(500).json ({message:error.message});
    }
}

const addHotelRoom = async (req,res) => {
    try{
        const room = await HotelRoom.create(req.body);
        res.status(200).json(room);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const updateHotelRoom = async (req,res) => {
    const HR_Id = req.params.id; 
    const body = req.body; 
    try{
        const updateHotelRoom = await HotelRoom.findOneAndUpdate(
            { HR_Id: HR_Id },
            body,
            { new: true, runValidators: true } 
          );
        res.status(200).json(updateHotelRoom);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
const deleteHotelRoom= async (req,res) => {
    const HR_Id = req.params.id;  
    try{
        const deleteHotelRoom = await HotelRoom.findOneAndDelete({ HR_Id: HR_Id });
        res.status(200).json(deleteHotelRoom);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    getAllHotelRoom,
    getHotelRoom,
    addHotelRoom,
    updateHotelRoom,
    deleteHotelRoom 
};