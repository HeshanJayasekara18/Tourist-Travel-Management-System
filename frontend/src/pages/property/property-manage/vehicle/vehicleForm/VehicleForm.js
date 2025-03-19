import react from "react";
import React,{useState} from "react";
import "./VehicleForm.css";


function VehicleForm(){
    const [formData,setFormData] =useState({
        modelName:"",
        seats:0,
        doors:0,
        fuelType:"",
        transmission:"",
        priceDay:0,
        priceMonth:0,
        status:"",
        image:null

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFileChange =(e)=>{
        const {name,files } = e.target;
        setFormData({...formData, [name]:files[0]});
    }

    const onSubmit = () => {
        console.log("My Form Data", formData);
    };

    return (
        <div class="vehicleForm">
            <div class="vehicleFormHeader">
                <h4>Vehicle Form</h4>
            </div>
            <div class="vehicleFormMain">
                <div class="MainVehicleInput1">
                    <lable>Model/Name</lable>
                    <input class="Vinput"
                           type="text" 
                           name="modelName"
                           value={formData.modelName}
                           onChange={handleChange}
                           />
                </div>
                <div class="MainVehicleInput1">
                    <div>
                        <lable>seats</lable>
                        <input class="Vinput" 
                               type="text" 
                               name="seats"
                               value={formData.seats}
                               onChange={handleChange}
                               />
                    </div>
                    <div>
                        <lable>Doors</lable>
                        <input class="Vinput" 
                               type="text" 
                               name="doors"
                               value={formData.doors}
                               onChange={handleChange}
                               />
                    </div>
                </div>
                <div class="MainVehicleInput1">
                    <div>
                        <lable>Fuel Type</lable>
                        <input class="Vinput" 
                               type="text" 
                               name="fuelType"
                               value={formData.fuelType}
                               onChange={handleChange}
                               />
                    </div>
                    <div>
                        <lable>Transmission</lable>
                        <input  class="Vinput" 
                                type="text" 
                                name="transmission"
                                value={formData.transmission}
                                onChange={handleChange}
                                />
                    </div>
                </div>
                <div class="MainVehicleInput1">
                    <div>
                        <lable>price/Day</lable>
                        <input class="Vinput" 
                               type="number" 
                               name="priceDay"
                               value={formData.priceDay}
                               onChange={handleChange}
                               
                               />
                    </div>
                    <div>
                        <lable>price/Month</lable>
                        <input class="Vinput" 
                               type="number" 
                               name="priceMonth"
                               value={formData.priceMonth}
                               onChange={handleChange}
                               />
                    </div>                        
                </div>
                <div>
                <div class="MainVehicleInput1">
                        <lable>Status</lable>
                        <input  class="Vinput" 
                                type="text" 
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                />
                    </div>
                    <div>
                        <lable>Image</lable>
                        <input  class="Vinput" 
                                type="file" 
                                name="image"
                                onChange={handleFileChange}
                                />
                    </div>
                </div>
            </div>
            <div class="vbtn">
                <button  type="button" onClick={onSubmit}>Submit</button>
            </div>

        </div>



    );
}
export default VehicleForm;