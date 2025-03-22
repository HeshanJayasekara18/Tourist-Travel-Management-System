import react from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import VehicleCard from '../../../../common/vehicle-card/vehicleCard';
import "./Vehicle.css"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import VehicleForm from './vehicleForm/VehicleForm';
import HotelForm from '../hotel/HotelForm/HotelForm';

function VehiclePage (){

    const [vehicleData,setVehicleData]=useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getAllVehicle();
      }, []);

      const getAllVehicle=()=>{
        axios.get("http://localhost:4000/api/vehicle")
        .then(response => {
            console.log(response.data);
            setVehicleData(response.data);
        })
        .catch(error => {
          console.error(error);
        });

      }

      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        getAllVehicle();
        setOpen(false);
      };

    return(
        <div class="main-vehcile-page">

          <div class="addVehicleNav">
            <div class="dataset">
                <div class="dateText">
                    <span class="u1">May</span>
                    <span class="u2">Today is Saturday, May 9th, 2025</span>
                </div>
                <div class="line"></div>
                <div class="manageTopic">
                  <h4>Vehicle Manage</h4>
                </div>
            </div>

            <div class="addbtn">
                  <button class="addVehicleBtn" onClick={handleClickOpen}>Add Vehicle</button>
            </div>
          </div>

          <div class="vehicle-card">
             {
                 vehicleData.map((vehicle)=>(
                     <VehicleCard key={vehicle.V_Id} V_Id={vehicle.V_Id} vehicle={vehicle}  getAllVehicle ={getAllVehicle}/>   
                ))
              }
          </div>

        {/* Material UI Dialog Popup */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" >
         <DialogContent md={{ width: "800px"}}>
          <VehicleForm V_Id={vehicleData.V_Id}  type="Submit" getAllVehicle ={getAllVehicle}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>      
          
        </div>
    );
}

export default VehiclePage;