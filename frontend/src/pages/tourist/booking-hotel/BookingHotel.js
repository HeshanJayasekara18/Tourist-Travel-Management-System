import React from "react";
import "./BookingHotel.css";
import BookingHeaderHotel from "../booking-header/BookingHeaderHotel";

function BookingHotel() {
    return (
        <><BookingHeaderHotel />
        <div className="hotel-booking-container">
            <div className="hotel-list">
                <div className="hotel-card">
                    <img src={null} alt="Brown Place Hotel" className="hotel-image" />
                    <div className="hotel-info">
                        <h3>Brown Place Hotel</h3>
                        <p>⭐⭐⭐⭐⭐</p>
                        <p>2 Deluxe luxury beds | Luxury washroom | Free WiFi</p>
                        <div className="date-selection">
                            <input type="date" defaultValue="2025-04-12" />
                            <input type="date" defaultValue="2025-04-18" />
                        </div>
                        <div className="hotel-footer">
                            <button className="book-now">Book Now</button>
                            <span className="price">$51.00</span>
                        </div>
                    </div>
                </div>

                <div className="hotel-card">
                    <img src={null} alt="Ocean Gate Hotel" className="hotel-image" />
                    <div className="hotel-info">
                        <h3>Ocean Gate Hotel</h3>
                        <p>⭐⭐⭐⭐</p>
                        <p>1 Deluxe luxury bed | Luxury washroom | Free WiFi</p>
                        <div className="date-selection">
                            <input type="date" defaultValue="2025-02-12" />
                            <input type="date" defaultValue="2025-02-14" />
                        </div>
                        <div className="hotel-footer">
                            <button className="book-now">Book Now</button>
                            <span className="price">$22.00</span>
                        </div>
                    </div>
                </div>

                <div className="hotel-card">
                    <img src={null} alt="Ocean Gate Hotel" className="hotel-image" />
                    <div className="hotel-info">
                        <h3>Ocean Gate Hotel</h3>
                        <p>⭐⭐⭐⭐</p>
                        <p>1 Deluxe luxury bed | Luxury washroom | Free WiFi</p>
                        <div className="date-selection">
                            <input type="date" defaultValue="2025-02-12" />
                            <input type="date" defaultValue="2025-02-14" />
                        </div>
                        <div className="hotel-footer">
                            <button className="book-now">Book Now</button>
                            <span className="price">$22.00</span>
                        </div>
                    </div>
                </div>

                <div className="hotel-card">
                    <img src={null} alt="Ocean Gate Hotel" className="hotel-image" />
                    <div className="hotel-info">
                        <h3>Ocean Gate Hotel</h3>
                        <p>⭐⭐⭐⭐</p>
                        <p>1 Deluxe luxury bed | Luxury washroom | Free WiFi</p>
                        <div className="date-selection">
                            <input type="date" defaultValue="2025-02-12" />
                            <input type="date" defaultValue="2025-02-14" />
                        </div>
                        <div className="hotel-footer">
                            <button className="book-now">Book Now</button>
                            <span className="price">$22.00</span>
                        </div>
                    </div>
                </div>

                <div className="hotel-card">
                    <img src={null} alt="Ocean Gate Hotel" className="hotel-image" />
                    <div className="hotel-info">
                        <h3>Ocean Gate Hotel</h3>
                        <p>⭐⭐⭐⭐</p>
                        <p>1 Deluxe luxury bed | Luxury washroom | Free WiFi</p>
                        <div className="date-selection">
                            <input type="date" defaultValue="2025-02-12" />
                            <input type="date" defaultValue="2025-02-14" />
                        </div>
                        <div className="hotel-footer">
                            <button className="book-now">Book Now</button>
                            <span className="price">$22.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div></>
    );
}

export default BookingHotel;
