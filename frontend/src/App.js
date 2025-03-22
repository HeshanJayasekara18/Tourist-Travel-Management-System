import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes}from 'react-router-dom';
import PropertySignup from './pages/property/property-signup/PropertySignup';
import Property from './pages/property/Property';
import HotelPage from './pages/property/property-manage/hotel/Hotel';
import VehiclePage from './pages/property/property-manage/vehicle/Vehicle';
import PropertyDashboard from './pages/property/property-manage/property-dashboard/PropertyDashboard';
import PropertyTransaction from './pages/property/property-manage/property-transaction/PropertyTransaction';
import BussinessProfile from './pages/property/property-manage/bussiness-profile/BussinessProfile';
import Admin from './pages/Admin/Admin';
import SimpleDashboard from './pages/Admin/InBuildpackage/Dashboard/Dashboard';
import UserManagement from './pages/Admin/InBuildpackage/adminUsermanage/AdminUserManagement';
import DisplayDetails from './pages/Admin/InBuildpackage/packagedisplaydetails/DisplayDetails';
import PaymentManagement from './pages/Admin/InBuildpackage/adminpaymentmanage/PaymentManagement';

function App() {
  return (
    
        <BrowserRouter>
          <Routes>
 


            <Route
               path='/admin'
               element={<Admin/>}>
                <Route index element={<SimpleDashboard/>}/>
                <Route path='user-manage' element={<UserManagement/>}/>
                <Route path='tour-manage' element={<DisplayDetails/>}/>
                <Route path='payment' element={<PaymentManagement/>}/>
               
            </Route>

            <Route
               path='/property'
               element={<Property/>}>
                <Route index element={<PropertyDashboard/>}/>
                <Route path='profile' element={<BussinessProfile/>}/>
                <Route path='hotel' element={<HotelPage/>}/>
                <Route path='vehicle' element={<VehiclePage/>}/>
                <Route path='transaction' element={<PropertyTransaction/>}/>
            </Route>

      
            
          
          </Routes>
        </BrowserRouter>
  
  )
}

export default App;
