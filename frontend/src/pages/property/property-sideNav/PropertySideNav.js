import react from "react";
import "./PropertySideNav.css"
import logo from '../../../images/logo.png'; 
import v1 from '../../../images/v1.png'; 
import v2 from '../../../images/v2.png'; 
import v3 from '../../../images/v3.png'; 
import v4 from '../../../images/v4.png'; 
import v5 from '../../../images/v5.png';
import v6 from '../../../images/v6.png';
import v7 from '../../../images/v7.png';





function PropertySideNav(){
    return(
        <div class="mainSideNav">

                <div> 
                    <img src={logo} alt="Description of image" />
                </div>

            <div class="sideNavBody">
                  <div class="sub1">
                    <div><p>Main</p></div>

                    <div class="sideNavbtn">
                        <img src={v1} className="icons" />   
                        <button>Dashboard</button>
                    </div>
                    <div class="sideNavbtn">
                        <img src={v2} className="icons" /> 
                        <button>Vehicle Dashboard</button>
                    </div>
                    <div class="sideNavbtn">
                        <img src={v3} className="icons" /> 
                        <button>Booking Manage</button>
                    </div>
                    <div class="sideNavbtn">
                        <img src={v4} className="icons" />
                        <button>Transaction Manage</button>
                    </div>
                    <div class="sideNavbtn">
                        <img src={v5} className="icons" />
                        <button>Chat</button>
                    </div>
                    </div>

                    <div class="sub2">
                      <div>
                        <p>Others</p>
                     </div>
                      <div class="sideNavbtn">
                            <img src={v6} className="icons" />
                            <button>Setting</button>
                      </div>
                      <div class="sideNavbtn">
                            <img src={v7} className="icons" />
                            <button>LogOut</button>
                      </div>  
                </div>                 
            </div>

         </div>     

    );
}
export default PropertySideNav;