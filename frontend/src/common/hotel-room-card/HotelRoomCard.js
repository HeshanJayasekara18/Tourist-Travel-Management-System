import React from "react";
import "./HotelRoomCard.css";
import v10 from '../../images/v10.png';
import v11 from '../../images/v11.png';
import v12 from '../../images/v12.png';
import v13 from '../../images/v13.png';

function HotelRoomCard() {
    return (
        <div className="main-card">
            
            <div className="hotel-card-image">
                <img src={v10}/>
            </div>


            <div class="hotel-card-body">             
             <div class="hotel-card-content">
                <h3>Brown place hotel</h3>
                <h5>Rating</h5>
                <p class="para">Brown Place Hotel is a cozy and elegant accommodation known for its warm hospitality and
                     modern amenities.
                </p>

                <div class="facility">
                    <div class = "facility-item">
                        <img  class="icon" src={v11}/>
                        <p>2 Delux luxury bed</p>
                    </div>
                    <div class = "facility-item">
                        <img class="icon" src={v12}/>
                        <p>Luxury wash room</p>
                    </div>
                    <div class = "facility-item">
                        <img class="icon" src={v13}/>
                        <p>Free Wifi</p>
                    </div>


                </div>
           
             </div>

             <div class="btnDiv">
                <div class="btns">
                    <button class="editBtn">Update</button>
                     <button class="deleteBtn">Delete</button>
                </div>

                <div>
                    <h3 class="price">$51.00/Night</h3>
                </div>
            </div>
            

            </div>
        </div>
    );
}

export default HotelRoomCard;   