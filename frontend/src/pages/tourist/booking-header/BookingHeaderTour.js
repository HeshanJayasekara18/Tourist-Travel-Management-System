import React from "react";
import "./BookingHeader.css";

function BookingHeaderTour() {
    return (
        <div className="booking-header">
            <div className="header-left">
                <div className="date-section">
                    
                    <p>Today is Saturday, May 9th, 2025  </p>
                </div>
            </div>
            
            <h2 className="header-title">| Plan Your Tour</h2>

            <div className="header-right">
                
                <div className="search-container">
                    <input type="text" placeholder="Search" className="search-box" />
                    <button className="filter-button">🔍</button>
                </div>
                
            </div>
        </div>
    );
}

export default BookingHeaderTour;
