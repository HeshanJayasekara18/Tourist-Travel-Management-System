const HotelRoom = require ("../model/hotelRoom");

// const getAllHotelRoom = async (req,res) => {
//     try{
//         const rooms = await HotelRoom.find({});
//         res.status(200).json(rooms);
//     }catch(error){
//         res.status(500).jason({ message: error.message });
//     }
// }

// const addHotelRoom = async (req,res) => {
//     try{
//         const room = await HotelRoom.create(req.body);
//         res.status(200).json(room);
//     }catch(error){
//         res.status(500).json({message:error.message});
//     }
// }


const addHotelRoom = async (req, res) => {
    try {
        const { B_Id, name, description, quantity, availability, price_day, price_month, bed, max_occupancy } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        // Create new hotel room
        const hotelRoom = new HotelRoom({
            B_Id,
            name,
            description,
            quantity,
            availability,
            price_day,
            price_month,
            bed,
            max_occupancy,
            image: {
                data: req.file.buffer, // Store binary data
                contentType: req.file.mimetype
            }
        });

        await hotelRoom.save();
        res.status(201).json({ message: "Hotel Room added successfully", hotelRoom });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getAllHotelRoom = async (req, res) => {
    try {
        const rooms = await HotelRoom.find();

        // Convert image buffer to Base64
        const roomsWithImages = rooms.map(room => ({
            _id: room._id,
            HR_Id: room.HR_Id,
            B_Id: room.B_Id,
            name: room.name,
            description: room.description,
            quantity: room.quantity,
            availability: room.availability,
            price_day: room.price_day,
            price_month: room.price_month,
            bed: room.bed,
            max_occupancy: room.max_occupancy,
            image: room.image
                ? `data:${room.image.contentType};base64,${room.image.data.toString("base64")}`
                : null,
        }));

        res.status(200).json(roomsWithImages);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



const getHotelRoom = async (req,res) => {
    try{
        const { HR_Id } = req.params.id;
        const room = await HotelRoom.findOne({ HR_Id: HR_Id });
        res.status(200).jason(room);

    }catch (error){
        res.status(500).json ({message:error.message});
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