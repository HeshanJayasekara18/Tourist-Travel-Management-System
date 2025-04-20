import React, { useState, useEffect } from "react";
import "./BookingHeader.css";

function BookingHeaderTour() {
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        // Get current date
        const date = new Date();
        
        // Format date to "Saturday, May 9th, 2025"
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);

        setCurrentDate(`Today is ${formattedDate}`);
    }, []);

    return (
        <div className="booking-header-h">
            <div className="header-left-h">
                <div className="date-section-h">
                    <p>{currentDate}</p> 
                </div>
            </div>
            
            <h2 className="header-title-h">| Plan Your Tour</h2>

            <div className="header-right-h">
                <div className="search-container-h">
                    <input type="text" placeholder="Search" className="search-box-h" />
                    <button className="filter-button-h">🔍</button>
                </div>
            </div>
        </div>
    );
}

export default BookingHeaderTour;
