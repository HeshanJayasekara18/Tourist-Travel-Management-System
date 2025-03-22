import React, { useState } from "react";
import "./PropertySignup.css";
import axios from 'axios';

function PropertySignup() {
    const [formData, setFormData] = useState({
        businessName: "",
        businessType: "",
        businessAddress: "",
        businessFile: null, // Set the initial state as null for the file
        description: "",
        fullName: "",
        userAddress: "", // Renamed to avoid duplicate field
        contact: "",
        email: "",
        password: "",
        rePassword: "",
        role:"Bussiness"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] }); // Save the first file in the state
    };

    const onSubmit = () => {
        console.log("My Form Data", formData);
        createBussinessUser();
    };

    const createBussinessUser=() =>{
        axios.post("http://localhost:4000/api/bussinessRegister",formData)
       .then(response => {
           alert("Bussiness User Added");
           console.log(response.data);          
       })
       .catch(error => {
         console.error(error);
       });

   }

    return (
        <div className="mainDiv">
            <div>
                <h1>Business Registration Form</h1>
            </div>

            <div className="mainForm">
                <div className="businessDetails">
                    <h4>Business Details</h4>
                    <div className="mainInput">
                        <div className="inputField">
                            <label>Business Name</label>
                            <input
                                className="input"
                                type="text"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputField">
                            <label>Business Type</label>
                            <input
                                className="input"
                                type="text"
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mainInput">
                        <div className="inputField">
                            <label>Address/City</label>
                            <input
                                className="input"
                                type="text"
                                name="businessAddress"
                                value={formData.businessAddress}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputField">
                            <label>Business File</label>
                            <input
                                type="file"
                                className="input"
                                name="businessFile"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <div className="mainInput">
                        <div className="inputField">
                            <label>Description</label>
                            <input
                                className="des"
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="userDetails">
                    <h4>User Details</h4>
                    <div className="mainInput">
                        <div className="inputField">
                            <label>Full Name</label>
                            <input
                                className="input"
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputField">
                            <label>Address</label>
                            <input
                                className="input"
                                type="text"
                                name="userAddress"
                                value={formData.userAddress}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mainInput">
                        <div className="inputField">
                            <label>Contact</label>
                            <input
                                className="input"
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputField">
                            <label>Email</label>
                            <input
                                type="text"
                                className="input"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mainInput">
                        <div className="inputField">
                            <label>Password</label>
                            <input
                                type="password"
                                className="input"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputField">
                            <label>Re-Password</label>
                            <input
                                type="password"
                                className="input"
                                name="rePassword"
                                value={formData.rePassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <button className="submitBtn" type="button" onClick={onSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PropertySignup;
