import React, { useState } from "react";
import "./VehicleForm.css";
import axios from 'axios';

function VehicleForm({ V_Id , type , getAllVehicle}) {
    const [formData, setFormData] = useState({
        B_Id:"B001",
        modelName: "",
        seats: 0,
        doors: 0,
        fuelType: "",
        transmission: "",
        priceDay: 0,
        priceMonth: 0,
        status: "",
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const onSubmit = () => {

        if(type=="Submit"){
            createVehicle();
           
        }else if(type=="Update"){
            updateVehicle();
          
        }
        console.log("My Form Data", formData);
      
    };

    const createVehicle = () => {
        axios.post("http://localhost:4000/api/vehicle", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
            alert("Vehicle added successfully!");
            getAllVehicle();
            console.log(response.data);
        })
        .catch(error => {
            console.error("Error adding vehicle:", error);
        });
    };

    const updateVehicle = () => {
        axios.put(`http://localhost:4000/api/vehicle/${V_Id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
            alert("Vehicle updated successfully!");   
            getAllVehicle();       
            console.log(response.data);
        })
        .catch(error => {
            console.error("Error adding vehicle:", error);
        });
    };
 
    


    return (
        <div className="MainVehicleForm">
            <div className="VehicleFormHeader">
                <h4>Vehicle  {type} Form</h4>
            </div>
            <div className="VformBody">
                <div className="formInputSet">
                    <label>Model Name</label>
                    <input className="VInput" 
                           type="text" 
                           name="modelName"
                           value={formData.modelName}
                           onChange={handleChange}
                           />
                </div>
                <div className="formInputSet">
                    <label>Seats</label>
                    <input className="VInput" 
                           type="number" 
                           name="seats"
                           value={formData.seats}
                           onChange={handleChange}
                           />
                    <label>Doors</label>
                    <input className="VInput" 
                           type="number" 
                           name="doors"
                           value={formData.doors}
                           onChange={handleChange}
                           />
                </div>
                <div className="formInputSet">
                    <label>Fuel Type</label>
                    <input className="VInput" 
                           type="text" 
                           name="fuelType"
                           value={formData.fuelType}
                           onChange={handleChange}
                           />
                    <label>Transmission</label>
                    <input className="VInput" 
                           type="text" 
                           name="transmission"
                           value={formData.transmission}
                           onChange={handleChange}
                           />
                </div>
                <div className="formInputSet">
                    <label>Price/Day</label>
                    <input className="VInput" 
                           type="number" 
                           name="priceDay"
                           value={formData.priceDay}
                           onChange={handleChange}
                           />
                    <label>Price/Month</label>
                    <input className="VInput" 
                           type="number" 
                           name="priceMonth"
                           value={formData.priceMonth}
                           onChange={handleChange}
                           />                    
                </div> 
                <div className="formInputSet">
                    <label>Status</label>
                    <input className="VInput" 
                           type="text" 
                           name="status"
                           value={formData.status}
                           onChange={handleChange}                           
                           />
                </div>
                <div className="formInputSet">
                    <label>Image</label>
                    <input className="VInput" 
                           type="file" 
                           name="image"
                           accept="image/*"
                           onChange={handleFileChange}
                           />
                </div>
            </div>
            <div className="Vbtn">
                <button type="button" onClick={onSubmit}>{type}</button>
            </div>
        </div>
    );
}

export default VehicleForm;
