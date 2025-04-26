import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookingVehicle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faGasPump, faCarSide, faCogs } from "@fortawesome/free-solid-svg-icons";


function BookingVehicle() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/vehicle");
                setVehicles(response.data);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };
        fetchVehicles();
    }, []);

    return (
        <>
           
            <div className="guide-container-h rtl">
                {vehicles.map((vehicle) => (
                    <div className="card-h" key={vehicle.V_Id}>
                        <img 
                            src={vehicle.image || "default-image.jpg"} 
                            alt="Vehicle" 
                            className="card-image-h" 
                        />
                        <div className="card-content-h">
                            <div className="rating-h">⭐⭐⭐⭐☆</div>
                            <h3 className="name-h">{vehicle.modelName}</h3>
                            <p className="price-h">
                                <span className="price-value-h">${vehicle.priceDay}</span> / Day
                            </p>
                            <div className="line-h"></div>

                            <div className="car-features-h">
                                <div className="feature-h">
                                    <FontAwesomeIcon icon={faUserGroup} />
                                    <span>{vehicle.seats} Seats</span>
                                </div>
                                <div className="feature-h">
                                    <FontAwesomeIcon icon={faGasPump} />
                                    <span>{vehicle.fuelType}</span>
                                </div>
                                <div className="feature-h">
                                    <FontAwesomeIcon icon={faCarSide} />
                                    <span>{vehicle.doors} Doors</span>
                                </div>
                                <div className="feature-h">
                                    <FontAwesomeIcon icon={faCogs} />
                                    <span>{vehicle.transmission}</span>
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
