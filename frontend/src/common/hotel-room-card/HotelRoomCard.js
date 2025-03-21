import React from "react";
import "./HotelRoomCard.css";
import v10 from '../../images/v10.png';
import v11 from '../../images/v11.png';
import v13 from '../../images/v13.png';
import v19 from '../../images/v19.png';
import v24 from '../../images/v24.png';

function HotelRoomCard({hotel}) {
    return (
        <div className="main-card">
            
            <div className="hotel-card-image">
                <img src={hotel.image}/>
            </div>


            <div class="hotel-card-body">             
             <div class="hotel-card-content">
                <h3>{hotel.name}</h3>
                <img  class="icon" src={v24}/>
                <p class="para">{hotel.description}
                </p>

                <div class="facility">
                    <div class = "facility-item">
                        <img  class="icon" src={v11}/>
                        <p>Beds : {hotel.bed}</p>
                    </div>
                    <div class = "facility-item">
                        <img class="icon" src={v19}/>
                        <p>Occupancy : {hotel.max_occupancy}</p>
                    </div>
                    <div class = "facility-item">
                        <img class="icon" src={v13}/>
                        <p>Free Wifi</p>
                    </div>
                    <div class = "facility-item">
                        <p class="qty">Quantity : {hotel.quantity}</p>
                    </div>


                </div>
           
             </div>

             <div class="btnDiv">
                <div class="btns">
                    <button class="editBtn">Update</button>
                     <button class="deleteBtn">Delete</button>
                </div>

                <div>
                    <h3 class="price">${hotel.price_day}/Night</h3>
                </div>
            </div>
            

            </div>
        </div>
    );
}

export default HotelRoomCard;   