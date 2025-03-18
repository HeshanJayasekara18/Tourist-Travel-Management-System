import React from "react";
// import css
import './vehicleCard.css';
import v14 from '../../images/v14.png';
import v15 from '../../images/v15.png';
import v16 from '../../images/v16.png';
import v17 from '../../images/v17.png';
import v18 from '../../images/v18.png';


function VehicleCard() {
    return (
        <div class="main-vehicle-card">
            <div class="vehicle-image">
                <img class="image" src={v14}/>
            </div>
            <div class="vehicle-details">
                <h5>Rating</h5>
                <h6>Hyundai Accent Limited</h6>
                <h6>$27.00/Day</h6>
            </div>
            <div class="vehicle-features">
                <div class="vehicle-features-set">
                    <div class="vehicle-features-item">
                        <img class="vicon" src={v15}/>
                        <h6>4 seats</h6>
                    </div>
                    <div class="vehicle-features-item">
                        <img class="vicon" src={v16}/>
                        <h6>Petrol</h6>
                    </div>
                </div>
                <div class="vehicle-features-set">
                    <div class="vehicle-features-item">
                        <img class="vicon" src={v17}/>
                        <h6>4 doors</h6>
                    </div>
                    <div class="vehicle-features-item">
                        <img class="vicon" src={v18}/>
                        <h6>Automatic</h6>
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