import React, { useState } from "react";
import "./BookingGuide.css";
import { useNavigate } from "react-router-dom";
import BannerSectionGuideBook from "./BannerSectionGuideBook";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import BookingGuideAvailability from "./booking-guide-availability/BookingGuideAvailability";
import BookingFooter from "../booking-footer/BookingFooter";

function BookingGuide() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };
  
  const handleClose = () => {
    setIsDialogOpen(false);
    getallguideavalability();
  };
  
  const getallguideavalability = () => {
    console.log("Fetching guide availability...");
  };

  // Guide data
  const guides = [
    { id: 1, name: "Saman Kumara", price: "$27.00", languages: "English, French", rating: "⭐⭐⭐⭐⭐", image: "/placeholder-guide-image.jpg" },
    { id: 2, name: "Natasha Fernando", price: "$15.00", languages: "English, German", rating: "⭐⭐⭐⭐☆", image: "/placeholder-guide-image.jpg" },
    { id: 3, name: "Kamal Peter", price: "$10.00", languages: "English, German", rating: "⭐⭐⭐⭐☆", image: "/placeholder-guide-image.jpg" },
    { id: 4, name: "Nimal Peter", price: "$10.00", languages: "English, German", rating: "⭐⭐⭐⭐☆", image: "/placeholder-guide-image.jpg" }
  ];
  
  return (
    <>
      <BannerSectionGuideBook />
      <div className="breadcrumb-guide">
        <span onClick={() => navigate('/')} className="breadcrumb-link-guide">Plan Your Tour</span> &gt;
        <span className="current-guide"> Guide Booking</span>
      </div>
      
      <div className="guide-container-h">
        {guides.map((guide) => (
          <div className="card-h" key={guide.id}>
            <img src={guide.image} alt={`Tour Guide ${guide.name}`} className="card-image-h" />
            <div className="card-content-h">
              <div className="rating-h">{guide.rating}</div>
              <h3 className="name-h">{guide.name}</h3>
              <p className="price-h">
                <span className="price-value-h">{guide.price}</span> / Day
              </p>
              <p className="languages-h">Languages - {guide.languages}</p>
              <button className="book-button-h" onClick={handleClickOpen}>Book</button>
            </div>
          </div>
        ))}
        
        <Dialog open={isDialogOpen} onClose={handleClose} fullWidth maxWidth="md">
          <DialogContent>
            <BookingGuideAvailability />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        
      </div>
      <BookingFooter/>
    </>
  );
}

export default BookingGuide;