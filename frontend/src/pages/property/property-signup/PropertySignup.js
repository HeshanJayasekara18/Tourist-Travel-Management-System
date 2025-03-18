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

            <div class="bussinessDetails">
                <h4>Bussness Details</h4>
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
                    <label>Address/City</label>
                    <input class="input"/>
                </div>
                <div className="inputFeild">
                    <label>Bussness File</label>
                    <input type="file" class="input"/>
                </div>
                
            </div>

            <div className="mainInput">
            <div className="inputFeild">
                    <label>Description</label>
                    <input class="des"/>
                </div>               
            </div>
            </div>

            <div class="UserDetails">
                <h4>User Details</h4>
            <div className="mainInput">
                <div className="inputFeild">
                    <label>Full Name</label>
                    <input class="input"/>
                </div>
                <div className="inputFeild">
                    <label>Address</label>
                    <input class="input"/>
                </div>

            
            </div>
                
            <div className="mainInput">
            <div className="inputFeild">
                    <label>Contact</label>
                    <input class="input"/>
                </div>
                <div className="inputFeild">
                    <label>Email</label>
                    <input type="input" class="input"/>
                </div>
                
            </div>

            <div className="mainInput">
            <div className="inputFeild">
                    <label>Password</label>
                    <input type="password" class="input"/>
                </div>
                <div className="inputFeild">
                    <label>Re Password</label>
                    <input type="password"  class="input"/>
                </div>
                
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
