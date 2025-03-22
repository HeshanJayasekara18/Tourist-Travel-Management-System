import React, { useState } from "react";
import "./BookingGuide.css";
import { useNavigate } from "react-router-dom";
import BookingHeaderHotel from "../booking-header/BookingHeaderGuide";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import BookingGuideAvailability from "./booking-guide-availability/BookingGuideAvailability";

function useGuideNavigation() {
  const navigate = useNavigate();
  return {
    onClickGuideAvailability: () => {
      navigate('/guide-book/guide-availability');
    }
  };
}

const guides = [
    { id: 1, name: "Saman Kumara", price: "$27.00", languages: "English, French", rating: "⭐⭐⭐⭐⭐", image: "null" },
    { id: 2, name: "Natasha Fernando", price: "$15.00", languages: "English, German", rating: "⭐⭐⭐⭐☆", image: "null" },
    { id: 3, name: "Kamal Peter", price: "$10.00", languages: "English, German", rating: "⭐⭐⭐⭐☆", image: "null" },
    { id: 4, name: "Nimal Peter", price: "$10.00", languages: "English, German", rating: "⭐⭐⭐⭐☆", image: "null" }
];

function BookingGuide() {
    const { onClickGuideAvailability } = useGuideNavigation();
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

    return (
        <>
            <BookingHeaderHotel />
            <div className="guide-container rtl">
                {guides.map((guide) => (
                    <div className="card" key={guide.id}>
                        <img src={guide.image} alt="Tour Guide" className="card-image" />
                        <div className="card-content">
                            <div className="rating">{guide.rating}</div>
                            <h3 className="name">{guide.name}</h3>
                            <p className="price">
                                <span className="price-value">{guide.price}</span> / Day
                            </p>
                            <p className="languages">Languages - {guide.languages}</p>
                            <button className="book-button" onClick={handleClickOpen}>Book</button>
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
        </>
    );
}

export default BookingGuide;
