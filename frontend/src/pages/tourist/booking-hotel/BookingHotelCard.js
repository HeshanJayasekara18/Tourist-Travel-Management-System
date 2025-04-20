import React from "react";
import "./BookingHotelCard.css";
import BookingHotelForm from './booking-hotel-form/BookingHotelForm';
import v10 from '../../../images/v10.png';
import v11 from '../../../images/v11.png';
import v13 from '../../../images/v13.png';
import v19 from '../../../images/v19.png';
import v24 from '../../../images/v24.png';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function HotelRoomCard({hotel,getAllHotelRoom,HR_Id}) {

    const [open, setOpen] = useState(false);

  // Open & Close Handlers
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
    setOpen(false);
    getAllHotelRoom(); // Refresh after closing
  };


    

            
   

    // const deleteHotelRoom=()=>{
    //     axios.delete(`http://localhost:4000/api/hotelRoom/${HR_Id}`)
    //     .then(response => {
    //         getAllHotelRoom();
    //         console.log(response.data)        
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });

    // }


    return (
        <div className="main-card">
            
            <div className="hotel-card-image">
                <img src={hotel.image}/>
            </div>


            <div class="hotel-card-body">             
             <div class="hotel-card-content">
                <h3>{hotel.name}</h3>
                <img  class="icon" src={v24}/>
                <p class="para">{hotel.description}
                </p>

                <div class="facility">
                    <div class = "facility-item">
                        <img  class="icon" src={v11}/>
                        <p>Beds : {hotel.bed}</p>
                    </div>
                    <div class = "facility-item">
                        <img class="icon" src={v19}/>
                        <p>Occupancy : {hotel.max_occupancy}</p>
                    </div>
                    <div class = "facility-item">
                        <img class="icon" src={v13}/>
                        <p>Free Wifi</p>
                    </div>
                    <div class = "facility-item">
                        <p class="qty">Quantity : {hotel.quantity}</p>
                    </div>


                </div>
           
             </div>

             <div class="btnDiv">
                { <div class="btns">
                    <button class="editBtn" onClick={handleOpen}>Book</button>
                     {/* <button class="deleteBtn" onClick={deleteHotelRoom}>Delete</button> */}
                </div> }

                <div>
                    <h3 class="price">${hotel.price_day}/Night</h3>
                </div>
            </div>
            

            </div>
            
             {/* Booking Form Popup */}
            <BookingHotelForm open={open} handleClose={handleClose} />
            
        </div>
       
      
    );
}

export default HotelRoomCard;   