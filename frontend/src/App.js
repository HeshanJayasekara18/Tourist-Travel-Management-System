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
import BookingGuide from './pages/tourist/booking-guide/BookingGuide';
import BookingGuideBooking from './pages/tourist/booking-guide/booking-guide-availability/booking-guide-booking/BookingGuideBooking';
import BookingHotel from './pages/tourist/booking-hotel/BookingHotel'
import BookingPayment from './pages/tourist/booking-payment/BookingPayment';
import BookingVehicle from './pages/tourist/booking-vehicle/BookingVehicle';
import TourPlan from './pages/tourist/tour-plan/TourPlan';
import TouristSignup from './pages/tourist/tourist-signup/TouristSignup';
import CustomerFeedback from './pages/tourist/customer-feedback/CustomerFeedback';
import Tourist from './pages/tourist/Tourist';
import TouristDetailsHeader from './pages/tourist/user-detail-nav/TouristDetailsHeader';
import TouristProfile from './pages/tourist/tourist-profile/TouristProfile';
import BookingGuideAvailability from './pages/tourist/booking-guide/booking-guide-availability/BookingGuideAvailability'

function App() {
  return (
    
        <BrowserRouter>
          <Routes>
            <Route path="/tourist-signup" element={<TouristSignup/>}/>


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

            <Route
               path='/Tourist'
               element={<Tourist/>}>
                <Route index element={<TourPlan/>}/>
                <Route path='hotel-book' element={<BookingHotel/>}/>
                <Route path='vehicle-book' element={<BookingVehicle/>}/>
                <Route path='guide-book' element={<BookingGuide/>}/>
                <Route path='Profile' element={<TouristProfile/>}/>
                <Route path='feedback' element={<CustomerFeedback/>}/>
                <Route path='guide-availability' element={<BookingGuideAvailability/>}/>
            </Route>
            
          
          </Routes>
        </BrowserRouter>
  
  )
}

export default App;
