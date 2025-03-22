import React from "react";
import "./BookingVehicle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faGasPump, faCarSide, faCogs } from "@fortawesome/free-solid-svg-icons";
import BookingHeaderVehicle from "../booking-header/BookingHeaderVehicle";


const guides = [
    {
        id: 1,
        name: "Prius",
        price: "$27.00",
        
        rating: "⭐⭐⭐⭐⭐",
        image: "null"
    },
    {
        id: 2,
        name: "Axio",
        price: "$15.00",
        
        rating: "⭐⭐⭐⭐☆",
        image: "null"
    },
    {
        id: 3,
        name: "KDH",
        price: "$10.00",
        
        rating: "⭐⭐⭐⭐☆",
        image: "null"
    },
    {
        id: 4,
        name: "Allion",
        price: "$10.00",
        
        rating: "⭐⭐⭐⭐☆",
        image: "null"
    },

    {
        id: 4,
        name: "Passo",
        price: "$10.00",
        
        rating: "⭐⭐⭐⭐☆",
        image: "null"
    }
];

function BookingVehicle() {
    return (
        <><BookingHeaderVehicle />
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
                        <div className="line"></div>


                        <div className="car-features">
                            <div className="feature">
                                <FontAwesomeIcon icon={faUserGroup} />
                                <span>4 Seats</span>
                            </div>
                            <div className="feature">
                                <FontAwesomeIcon icon={faGasPump} />
                                <span>Petrol</span>
                            </div>
                            <div className="feature">
                                <FontAwesomeIcon icon={faCarSide} />
                                <span>4 Doors</span>
                            </div>
                            <div className="feature">
                                <FontAwesomeIcon icon={faCogs} />
                                <span>Automatic</span>
                            </div>
                        </div>
                        <button className="book-button">Book</button>
                    </div>
                </div>
            ))}
        </div></>
    );
}

export default BookingVehicle;