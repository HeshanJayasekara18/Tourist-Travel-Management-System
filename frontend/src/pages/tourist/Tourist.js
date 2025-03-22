import React from "react";
import BookingNavbar from "./booking-navbar/BookingNavbar";
import TouristDetailsHeader from "./user-detail-nav/TouristDetailsHeader";
import BookingHeaderTour from "./booking-header/BookingHeaderTour";
import { Outlet } from "react-router-dom";

function Tourist(){
    return(
        <div>
            <BookingNavbar/>
            <BookingHeaderTour/>
            <TouristDetailsHeader/>
            <Outlet/>
        </div>
    )
}
export default Tourist;