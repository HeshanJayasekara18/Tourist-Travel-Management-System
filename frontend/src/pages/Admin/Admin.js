import React from "react";
import PackageSideNav from "./InBuildpackage/package-navbar/packageNavbar";
import { Outlet } from "react-router-dom";
import PackageDetail from "./InBuildpackage/package-detail-nav/packageDetail";
import PackageBookingHeader from "./InBuildpackage/package-booking-header/PackageBookingHeader";

function Admin() {
    return(
        <div>
            <PackageSideNav/>  
            <PackageDetail/>
            <PackageBookingHeader/>
            <Outlet/>       
        </div>
    );
}

export default Admin;