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
        id: 5,
        name: "Passo",
        price: "$10.00",
        rating: "⭐⭐⭐⭐☆",
        image: "null"
    }
];

function BookingVehicle() {
    return (
        <>
            <BookingHeaderVehicle />
            <div className="guide-container-h rtl">
                {guides.map((guide) => (
                    <div className="card-h" key={guide.id}>
                        <img src={guide.image} alt="Vehicle" className="card-image-h" />
                        <div className="card-content-h">
                            <div className="rating-h">{guide.rating}</div>
                            <h3 className="name-h">{guide.name}</h3>
                            <p className="price-h">
                                <span className="price-value-h">{guide.price}</span> / Day
                            </p>
                            <div className="line-h"></div>

                            <div className="car-features-h">
                                <div className="feature-h">
                                    <FontAwesomeIcon icon={faUserGroup} />
                                    <span>4 Seats</span>
                                </div>
                                <div className="feature-h">
                                    <FontAwesomeIcon icon={faGasPump} />
                                    <span>Petrol</span>
                                </div>
                                <div className="feature-h">
                                    <FontAwesomeIcon icon={faCarSide} />
                                    <span>4 Doors</span>
                                </div>
                                <div className="feature-h">
                                    <FontAwesomeIcon icon={faCogs} />
                                    <span>Automatic</span>
                                </div>
                            </div>
                            <button className="book-button-h">Book</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BookingVehicle;
