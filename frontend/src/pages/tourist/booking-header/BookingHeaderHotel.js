import React from "react";
import "./BookingHeader.css";

function BookingHeaderHotel() {
    return (
        <div className="booking-header-h">
            <div className="header-left-h">
                <div className="date-section-h">
                    
                    <p>Today is Saturday, May 9th, 2025  </p>
                </div>
            </div>
            
            <h2 className="header-title-h">| Book Your Hotel</h2>

            <div className="header-right-h">
                
                <div className="search-container-h">
                    <input type="text" placeholder="Search" className="search-box-h" />
                    <button className="filter-button-h">🔍</button>
                </div>
                
            </div>
        </div>
    );
}

export default BookingHeaderHotel;
