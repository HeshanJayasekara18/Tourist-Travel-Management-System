import React from "react";
// import css
import './vehicleCard.css';
import v14 from '../../images/v14.png';
import v15 from '../../images/v15.png';
import v16 from '../../images/v16.png';
import v17 from '../../images/v17.png';
import v18 from '../../images/v18.png';
import v24 from '../../images/v24.png';


function VehicleCard({ vehicle }) {
    return (
        <div class="main-vehicle-card">
            <div class="vehicle-image">
                <img class="image" src={vehicle.image}/>
            </div>
            <div class="vehicle-details">
                <img  class="icon" src={v24}/>
                <h6>{vehicle.modelName}</h6>
                <h6>${vehicle.priceDay}</h6>
            </div>
            <div class="vehicle-features">
                <div class="vehicle-features-set">
                    <div class="vehicle-features-item">
                        <img class="vicon" src={v15}/>
                        <h6>{vehicle.seats}</h6>
                    </div>
                    <div class="vehicle-features-item">
                        <img class="vicon" src={v16}/>
                        <h6>{vehicle.fuelType}</h6>
                    </div>
                </div>
                <div class="vehicle-features-set">
                    <div class="vehicle-features-item">
                        <img class="vicon" src={v17}/>
                        <h6>{vehicle.doors}</h6>
                    </div>
                    <div class="vehicle-features-item">
                        <img class="vicon" src={v18}/>
                        <h6>{vehicle.transmission}</h6>
                    </div>

                </div>
            </div>
            <div class="vbtnDiv">           
                    <button class="VeditBtn">Update</button>
                     <button class="VdeleteBtn">Delete</button>
                </div>            
        </div>
    );
}
export default VehicleCard;