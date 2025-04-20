import React, { useState, useEffect } from "react";
import "./BookingHotel.css";
import BookingHeaderHotel from "../booking-header/BookingHeaderHotel";
import axios from "axios";
import BookingHotelCard from "./BookingHotelCard"
import BookingForm from "./booking-hotel-form/BookingHotelForm";



function BookingHotel() {
    const [open, setOpen] = useState(false);
     const [hotelData, setHotelData] = useState([]);

     <BookingForm />
            
        // Open & Close Handlers
    const handleClickOpen = () => {
     setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        getAllHotelRoom();

    };


      useEffect(() => {
        getAllHotelRoom();
      }, []);
    

      const getAllHotelRoom = () => {
        axios
          .get("http://localhost:4000/api/hotelRoom")
          .then((response) => {
            console.log(response.data);
            setHotelData(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
    

    

    return (
        <>
            <BookingHeaderHotel />
            <div className="hotel-booking-container-h">
                <div className="hotel-list-h">
                <div className="hotel-card">
          {hotelData.map((hotel) => (
            <BookingHotelCard key={hotel.HR_Id} HR_Id={hotel.HR_Id} hotel={hotel} getAllHotelRoom={getAllHotelRoom}/>
          ))}
        </div>
                </div>
            </div>
        </>
    );
}

export default BookingHotel;
