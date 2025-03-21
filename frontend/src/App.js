import logo from './logo.svg';
import './App.css';
import BookingHeader from './pages/tourist/booking-header/BookingHeader';
import BookingHotel from './pages/tourist/booking-hotel/BookingHotel';
import BookingNavbar from './pages/tourist/booking-navbar/BookingNavbar';
import UserDetailNav from './common/user-detail-nav/UserDetailNav';
import MainLogin from './common/main-login/MainLogin';
import BookingGuideBooking from './pages/tourist/booking-guide/booking-guide-availability/booking-guide-booking/BookingGuideBooking';
/*import BookingHotel from './pages/tourist/booking-hotel/BookingHotel';*/

function App() {
  return (
    <><BookingNavbar /><UserDetailNav /><BookingHeader /><BookingHotel/></>
    );
}

export default App;
