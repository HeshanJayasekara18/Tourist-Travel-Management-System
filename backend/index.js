const express = require("express");
const app = express();


const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/db");

const testRoute = require('./route/testRoute');
const vehicleRoute = require('./route/VehicleRoute');
const hotelRoomRoute = require('./route/HotelRoomRoute');
const bussinessRegisterRoute = require('./route/BussinessRegisterRoute');
const TourPackageRoute = require('./route/TourPackageRoute');
const PaymentRoute = require('./route/PaymentRoute');

const BookingRoute = require('./route/BookingRoute');
const TouristRoute = require('./route/TouristRoute');
const TourRoute = require('./route/TourRoute');
const LoginRoute = require('./route/LoginRoute');
const MailRoute = require('./route/MailRoute');
const TouristRegisterRoute = require('./route/TouristRegistration');
const TourGuideRoute = require('./route/TourGuideRoute');
const FeedbackRoute = require('./route/FeedbackRoute');
const GuideDetails = require('./route/GuideDetails');
const ChatRoute = require('./route/ChatRoute');


dotenv.config();

const PORT = process.env.PORT ;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api',testRoute);
app.use('/api/vehicle',vehicleRoute);
app.use('/api/hotelRoom',hotelRoomRoute);
app.use('/api/bussinessRegister',bussinessRegisterRoute);
app.use('/api/tourPackage',TourPackageRoute);
app.use('/api/payment', PaymentRoute);
app.use('/api/sendMail', MailRoute);



app.use('/api/Booking',BookingRoute);
app.use('/api/Tourist',TouristRoute);
app.use('/api/Tour',TourRoute);
app.use('/api/Login',LoginRoute);
app.use('/api/TouristRegister',TouristRegisterRoute);

app.use('/api/TourGuide',TourGuideRoute);
app.use('/api/GuideDetails',GuideDetails);
app.use('/api/feedback',FeedbackRoute);
app.use('/uploads', express.static('uploads'));
app.use('/api/chat', ChatRoute);


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

    
});
app.get("/", (req, res) => {
    res.send("Hello World");
});


