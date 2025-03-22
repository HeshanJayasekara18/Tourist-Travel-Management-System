import React, { useState } from 'react';
import './BookingGuideAvailability.css'; 



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
    <div className="availability-container">
      <h2 className="availability-title">Availability</h2>
      
      <div className="availability-content">
        {/* Guide Profile Card */}
        <div className="guide-card">
          <img 
            src="/api/placeholder/200/160" 
            alt="Guide profile" 
            className="guide-image"
          />
          <div className="rating">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>
          <h3 className="guide-name">Saman kumara</h3>
          <p className="guide-price">$2750 / Day</p>
          
          <div className="guide-languages">
            <p className="language-label">Languages -</p>
            <p className="language-list">English,France</p>
          </div>
          
          <button className="view-profile-btn">View Profile</button>
        </div>
        
        {/* Calendar */}
        <div className="calendar-container">
          <div className="calendar-header">
            <p className="select-text">Please Select Tour Days</p>
            
            <div className="month-navigation">
              <h3 className="current-month">{`${currentMonth} ${currentYear}`}</h3>
              <div className="month-buttons">
                <button className="month-nav-btn" onClick={handlePrevMonth}>&lt;</button>
                <button className="month-nav-btn" onClick={handleNextMonth}>&gt;</button>
              </div>
            </div>
          </div>
          
          {/* Calendar grid */}
          <div className="calendar-grid">
            {/* Weekday headers */}
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, index) => (
              <div key={index} className="weekday-header">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className={`calendar-day ${day === selectedDate ? 'selected' : ''} ${!day ? 'empty' : ''}`}
                onClick={() => day && handleDateClick(day)}
              >
                {day || ''}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
};
export default BookingGuideAvailability;