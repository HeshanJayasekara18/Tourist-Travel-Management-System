import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Hotel.css";
import HotelRoomCard from "../../../../common/hotel-room-card/HotelRoomCard";


import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import HotelForm from "./HotelForm/HotelForm";

function HotelPage() {
  const [hotelData, setHotelData] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // <- added

  const userId=localStorage.getItem("userID")
  useEffect(() => {
    getAllHotelRoom();
  }, []);

  const getAllHotelRoom = () => {
    axios
      .get(`http://localhost:4000/api/hotelRoom/getHotelRoomById?userId=${userId}`)
      .then((response) => {
        console.log(response.data);
        setHotelData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Open & Close Handlers
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    getAllHotelRoom();

  };

    // Filtered data based on search
    const filteredHotels = hotelData.filter((hotel) =>
      hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.availability?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  

  return (
    <div>
      <div className="main-hotel-page">
        <div className="addHotelNav">
          <div className="dataset">
            <div className="dateText">
              <span className="u1">May</span>
              <span className="u2">Today is Saturday, May 9th, 2025</span>
            </div>
            <div className="line"></div>
            <div className="manageTopic">
              <h4>Hotel Manage</h4>
            </div>
          </div>
          <div className="addbtn">
            <button className="addHotelBtn" onClick={handleClickOpen}>
              Add Hotel
            </button>
          </div>
        </div>

        <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Search by hotel name, room type, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

        <div className="hotel-card">
          {filteredHotels.map((hotel) => (
            <HotelRoomCard key={hotel.HR_Id} HR_Id={hotel.HR_Id} hotel={hotel} getAllHotelRoom={getAllHotelRoom}/>
          ))}
        </div>
      </div>

      {/* Material UI Dialog Popup */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent md={{ width: "500px"}}>
          <HotelForm HR_Id={hotelData.HR_Id} type="Submit" getAllHotelRoom={getAllHotelRoom} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HotelPage;
