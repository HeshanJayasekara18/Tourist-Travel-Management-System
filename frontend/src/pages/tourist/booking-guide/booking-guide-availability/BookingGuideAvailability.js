import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './BookingGuideAvailability.css'; 
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";

function useGuideNavigationToBooking() {
  const navigate = useNavigate();
  return {
    onClickGuideAvailability: () => {
      navigate('/guide-book/guide-availability/guide-book-availability');
    }
  };
}

const BookingGuideAvailability = () => {
  const [selectedDate, setSelectedDate] = useState(18);
  const [currentMonth, setCurrentMonth] = useState('May');
  const [currentYear, setCurrentYear] = useState(2023);
  
  // Calendar data generation
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const generateCalendarDays = () => {
    const monthIndex = ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December']
                         .indexOf(currentMonth);
    const daysInMonth = getDaysInMonth(monthIndex, currentYear);
    const firstDay = new Date(currentYear, monthIndex, 1).getDay();
    const days = [];
    
    // Adjust for Monday as first day (0 becomes Sunday at the end)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  const handlePrevMonth = () => {
    const monthIndex = ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December']
                         .indexOf(currentMonth);
    
    if (monthIndex === 0) {
      setCurrentMonth('December');
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'][monthIndex - 1]);
    }
    setSelectedDate(null);
  };
  
  const handleNextMonth = () => {
    const monthIndex = ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December']
                         .indexOf(currentMonth);
    
    if (monthIndex === 11) {
      setCurrentMonth('January');
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'][monthIndex + 1]);
    }
    setSelectedDate(null);
  };
  
  const handleDateClick = (day) => {
    setSelectedDate(day);
  };
  
  const calendarDays = generateCalendarDays();
  
  return (
    <div className="availability-container-h">
      <h2 className="availability-title-h">Availability</h2>
      
      <div className="availability-content-h">
        {/* Guide Profile Card */}
        <div className="guide-card-h">
          <img 
            src="/api/placeholder/200/160" 
            alt="Guide profile" 
            className="guide-image-h"
          />
          <div className="rating-h">
            <span className="star-h">★</span>
            <span className="star-h">★</span>
            <span className="star-h">★</span>
            <span className="star-h">★</span>
            <span className="star-h">★</span>
          </div>
          <h3 className="guide-name-h">Saman kumara</h3>
          <p className="guide-price-h">$2750 / Day</p>
          
          <div className="guide-languages-h">
            <p className="language-label-h">Languages -</p>
            <p className="language-list-h">English, France</p>
          </div>
          
          <button className="view-profile-btn-h">View Profile</button>
        </div>
        
        {/* Calendar */}
        <div className="calendar-container-h">
          <div className="calendar-header-h">
            <p className="select-text-h">Please Select Tour Days</p>
            
            <div className="month-navigation-h">
              <h3 className="current-month-h">{`${currentMonth} ${currentYear}`}</h3>
              <div className="month-buttons-h">
                <button className="month-nav-btn-h" onClick={handlePrevMonth}>&lt;</button>
                <button className="month-nav-btn-h" onClick={handleNextMonth}>&gt;</button>
              </div>
            </div>
          </div>
          
          {/* Calendar grid */}
          <div className="calendar-grid-h">
            {/* Weekday headers */}
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, index) => (
              <div key={index} className="weekday-header-h">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className={`calendar-day-h ${day === selectedDate ? 'selected-h' : ''} ${!day ? 'empty-h' : ''}`}
                onClick={() => day && handleDateClick(day)}
              >
                {day || ''}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="action-buttons-h">
        <button className="next-btn-h">Next</button>
      </div>
    </div>
  );
};

export default BookingGuideAvailability;
