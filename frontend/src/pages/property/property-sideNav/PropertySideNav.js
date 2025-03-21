import react from "react";
import "./PropertySideNav.css"
import logo from '../../../images/logo.png'; 
import v1 from '../../../images/v1.png'; 
import v3 from '../../../images/v3.png'; 
import v4 from '../../../images/v4.png'; 
import v5 from '../../../images/v5.png';
import v6 from '../../../images/v6.png';
import v7 from '../../../images/v7.png';
import v21 from '../../../images/v21.png';
import v22 from '../../../images/v22.png';
import v23 from '../../../images/v23.png';
import { useNavigate } from "react-router-dom";

function PropertySideNav(){

    const navigate=useNavigate();

    const onClickDashboard=()=>{
        navigate('/property/');
    }

    const onClickVehicleManage=()=>{
        navigate('/property/vehicle');
    }

    const onClickHotelManage=()=>{
        navigate('/property/hotel');
    }
    const onClickTransactionManage=()=>{
        navigate('/property/transaction');
    }

    const onClickProfileDetail=()=>{
        navigate('/property/profile');
    }

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
                        <button onClick={onClickDashboard}>Dashboard</button>
                    </div>
                    <div class="sideNavbtn">
                        <img src={v21} className="icons" /> 
                        <button onClick={onClickVehicleManage}>Vehicle Manage</button>
                    </div>
                    <div class="sideNavbtn">
                        <img src={v22} className="icons" /> 
                        <button onClick={onClickHotelManage}>Hotel Manage</button>
                    </div>
                    <div class="sideNavbtn">
                        <img src={v23} className="icons" />
                        <button onClick={onClickTransactionManage}>Transaction Manage</button>
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
                            <button onClick={onClickProfileDetail}>Setting</button>
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