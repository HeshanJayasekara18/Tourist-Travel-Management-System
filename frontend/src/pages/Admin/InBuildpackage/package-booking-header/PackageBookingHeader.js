import React from "react";
import "./PackageBookingHeader.css";

function PackageBookingHeader() {
    // Get current date in proper format
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    return (
        <div className="booking-header">
            <div className="header-left">
                <div className="date-section">
                    <p>{formattedDate}</p>
                </div>
            </div>
            
            <h2 className="header-title">Book Your Package</h2>
            
            <div className="header-right">
                <div className="search-container">
                    <input type="text" placeholder="Search packages..." className="search-box" />
                    <button className="filter-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </div>
                <button className="add-package-btn">
                    <span>+</span> Add Package
                </button>
            </div>
        </div>
    );
}

export default PackageBookingHeader;