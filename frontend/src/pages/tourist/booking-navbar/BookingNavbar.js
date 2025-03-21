import react from "react";
import "./BookingNavbar.css"
import hlogo from '../../../images/h-Logo.png'; 
import h1 from '../../../images/h1.png'; 
import h2 from '../../../images/h2.png'; 
import h3 from '../../../images/h3.png'; 
import h4 from '../../../images/h4.png'; 
import h5 from '../../../images/h5.png';
import h6 from '../../../images/h6.png';
import h7 from '../../../images/h7.png';





function BookingNavbar(){
    return(
        <div class="mainSideNav">

                <div> 
                    <img src={hlogo} alt="Description of image" />
                </div>

            <div class="sideNavBody">
                  <div class="sub1">
                    

                    <div class="sideNavbtn">
                        <img src={h1} className="icons" />   
                        <button>Dashboard</button>
                    </div>
                    <div class="sideNavbtn">
                        <img src={h2} className="icons" /> 
                        <button>Tour Manage</button>
                    </div>
                    <div class="sideNavbtn">
                        <img src={h3} className="icons" /> 
                        <button>Hotel Book</button>
                    </div>
                    <div class="sideNavbtn">
                        <img src={h4} className="icons" />
                        <button>Vehicle Book</button>
                    </div>
                    <div class="sideNavbtn">
                        <img src={h5} className="icons" />
                        <button>Payment</button>
                    </div>
                    </div>

                    <div class="nav-other">
                      <div class="sideNavbtn">
                            <img src={h6} className="icons" />
                            <button>Setting</button>
                      </div>
                      <div class="sideNavbtn">
                            <img src={h7} className="icons" />
                            <button>LogOut</button>
                      </div> 
                    </div> 
                                
            </div>

         </div>     

    );
}
export default BookingNavbar;