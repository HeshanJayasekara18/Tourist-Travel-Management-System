import React from "react";
import "./PropertySignup.css"

function PropertySignup() {
    return (
        <div class="mainDiv" >
            {/* This is Heading */}
           <div>
                <h1>Bussiness registration from</h1>
           </div>

            {/* This is Form Div */}
           <div className="mainForm">

            <div className="mainInput">
                <div className="inputFeild">
                    <label>Bussiness Name</label>
                    <input class="input"/>
                </div>
                <div className="inputFeild">
                    <label>Bussiness Type</label>
                    <input class="input"/>
                </div>
            </div>
                

            <div className="mainInput">
            <div className="inputFeild">
                    <label>Registration Number</label>
                    <input class="input"/>
                </div>
                <div className="inputFeild">
                    <label>Address</label>
                    <input class="input"/>
                </div>
                
            </div>

            <div className="mainInput">
            <div className="inputFeild">
                    <label>City</label>
                    <input class="input"/>
                </div>
                <div className="inputFeild">
                    <label>Phone Number</label>
                    <input class="input"/>
                </div>
                
            </div>

            <div className="mainInput">
            <div className="inputFeild">
                    <label>Email</label>
                    <input class="email"/>
                </div>               
            </div>

            <div className="mainInput">
            <div className="inputFeild">
                    <label>Description</label>
                    <input class="des"/>
                </div>               
            </div>

               <div className="mainInput">
            <div className="inputFeild">
                    <label>File Upload</label>
                    <input type="file" class="input"/>
                </div>
                <div className="inputFeild">
                    <label>File Upload</label>
                    <input type="file" class="input"/>
                </div>
             </div>

                        
            <div>
                <button class="submitBtn" >Submit</button>
            </div>

           </div>


        </div>
    );
}

export default PropertySignup;
