import react from "react";
import React,{useState} from "react";
import "./HotelForm.css";


function HotelForm(){
    const [formData,setFormData] = useState({
        hotelName:"",
        beds:0,
        maxOccupancy:0,
        priceDay:0,
        priceMonth:0,
        quantity:0,
        status:"",
        description:"",
        image:null
    });

    const handleChange =(e) =>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    };

    const handleFileChange =(e)=>{
        const {name,files} =e.target;
        setFormData({...formData,[name]:files[0]});
    };

    const onSubmit = () => {
        console.log("My Form Data", formData);
    };



    return (
        <div class="MainHotelForm">
            <div class="HotelFormHeader">
                <h4>Hotel Form</h4>
            </div>
            <div class="HformBody">
                <div class="formInputSet">
                    <label>Hotel Name</label>
                    <input class="HInput" 
                           type="text" 
                           name="hotelName"
                           value={formData.hotelName}
                           onChange={handleChange}
                           />
                </div>
                <div class="formInputSet">
                    <label>Beds</label>
                    <input  class="HInput" 
                            type="text" 
                            name="beds"
                            value={formData.beds}
                            onChange={handleChange}
                            />
                    <label>Max Occupancy</label>
                    <input class="HInput" 
                           type="text" 
                           name="maxOccupancy"
                           value={formData.maxOccupancy}
                           onChange={handleChange}
                           />
                </div>
                <div class="formInputSet">
                    <label>Price/Day</label>
                    <input class="HInput" 
                           type="number" 
                           name="priceDay"
                           value={formData.priceDay}
                           onChange={handleChange}
                           />
                    <label>Price/Month</label>
                    <input class="HInput" 
                           type="number" 
                           name="priceMonth"
                           value={formData.priceMonth}
                           onChange={handleChange}
                           />                   
                </div> 
                <div class="formInputSet">
                    <lablel>Quantity</lablel>
                    <input class="HInput" 
                           type="text" 
                           name="quantity"
                           value={formData.quantity}
                           onChange={handleChange}
                           />
                    <lablel>Status</lablel>
                    <input class="HInput" 
                           type="text" 
                           name="status"
                           value={formData.status}
                           onChange={handleChange}                          
                           />
                </div>
                <div class="formInputSet">
                    <lable>Description</lable>
                    <input class="HInput" 
                           type="text" 
                           name="description"
                           value={formData.description}
                           onChange={handleChange}
                           />
                </div>
                <div class="formInputSet">
                    <lable>Image</lable>
                    <input class="HInput" 
                           type="file" 
                           name="image"
                            onChange={handleFileChange}
                           />
                </div>
            </div>
            <div class="Hbtn">
                <button type="button" onClick={onSubmit}>Submit</button>
            </div>

        </div>

    );
}
export default HotelForm;