const express = require("express");
const app = express();


const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/db");

const testRoute = require('./route/testRoute');
const BookingRoute = require('./route/BookingRoute');
const TouristRoute = require('./route/TouristRoute');
const TourRoute = require('./route/TourRoute');



dotenv.config();

const PORT = process.env.PORT ;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api',testRoute);
app.use('/api/Booking',BookingRoute);
app.use('/api/Tourist',TouristRoute);
app.use('/api/Tour',TourRoute);


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
