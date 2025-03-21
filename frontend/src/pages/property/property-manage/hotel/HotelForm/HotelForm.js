import react from "react";
import React,{useState} from "react";
import "./HotelForm.css";
import axios from 'axios';


function HotelForm(){
    const [formData,setFormData] = useState({
        B_Id:"B001",
        name:"",
        bed:0,
        max_occupancy:0,
        price_day:0,
        price_month:0,
        quantity:0,
        availability:"",
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
        createHotelRoom();
    };

    const createHotelRoom=() =>{
        axios.post("http://localhost:4000/api/hotelRoom",formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
       .then(response => {
           alert("Hotel Room added success");
           console.log(response.data);          
       })
       .catch(error => {
         console.error(error);
       });

   }


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
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           />
                </div>
                <div class="formInputSet">
                    <label>Beds</label>
                    <input  class="HInput" 
                            type="text" 
                            name="bed"
                            value={formData.bed}
                            onChange={handleChange}
                            />
                    <label>Max Occupancy</label>
                    <input class="HInput" 
                           type="text" 
                           name="max_occupancy"
                           value={formData.max_occupancy}
                           onChange={handleChange}
                           />
                </div>
                <div class="formInputSet">
                    <label>Price/Day</label>
                    <input class="HInput" 
                           type="number" 
                           name="price_day"
                           value={formData.price_day}
                           onChange={handleChange}
                           />
                    <label>Price/Month</label>
                    <input class="HInput" 
                           type="number" 
                           name="price_month"
                           value={formData.price_month}
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
                           name="availability"
                           value={formData.availability}
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
                            accept="image/*"
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