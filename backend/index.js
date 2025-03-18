const express = require("express");
const app = express();
const PORT = process.env.PORT ;

const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/db");

const testRoute = require('./route/testRoute');
const vehicleRoute = require('./route/VehicleRoute');
const hotelRoomRoute = require('./route/HotelRoomRoute');
const bussinessRegisterRoute = require('./route/BussinessRegisterRoute');

dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api',testRoute);
app.use('/api/vehicle',vehicleRoute);
app.use('/api/hotelRoom',hotelRoomRoute);
app.use('/api/bussinessRegister',bussinessRegisterRoute);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
