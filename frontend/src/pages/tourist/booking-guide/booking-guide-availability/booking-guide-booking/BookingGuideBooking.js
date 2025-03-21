import React, { useState } from 'react';
import './BookingGuideBooking.css';

const BookingGuideBooking = () => {
  const [startDate, setStartDate] = useState('2025/02/12');
  const [endDate, setEndDate] = useState('2025/02/18');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [notes, setNotes] = useState('');

  const handleRequestBooking = () => {
    console.log('Booking requested:', {
      startDate,
      endDate,
      fullName,
      contactNumber,
      notes
    });
  };

  return (
    <div className="tour-booking-container">
      <h1 className="availability-title">Availability</h1>
      
      <div className="booking-content">
        <div className="tour-guide-card">
          <img 
            src="/guide-profile.jpg" 
            alt="Tour guide profile" 
            className="guide-image" 
          />
          
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="star">★</span>
            ))}
          </div>
          
          <h3 className="guide-name">Saman kumara</h3>
          <p className="guide-price">$2700 / Day</p>
          
          <div className="guide-details">
            <p className="guide-languages">
              <strong>Languages - </strong>
              English,France
            </p>
          </div>
          
          <button className="view-profile-btn">View Profile</button>
        </div>
        
        <div className="booking-form">
          
          
          <div className="booking-period">
            <h3>Booking Period</h3>
            
            <div className="date-inputs">
              <div className="date-field">
                <label>Start Date</label>
                <div className="date-input-container">
                  <span className="calendar-icon">📅</span>
                  <input 
                    type="text" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="date-field">
                <label>End Date</label>
                <div className="date-input-container">
                  <span className="calendar-icon">📅</span>
                  <input 
                    type="text" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="tour-details">
            <h3>Enter Your Tour Details</h3>
            
            <div className="form-field">
              <label>Full Name</label>
              <input 
                type="text" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
              />
            </div>
            
            <div className="form-field">
              <label>Contact Number</label>
              <input 
                type="text" 
                value={contactNumber} 
                onChange={(e) => setContactNumber(e.target.value)} 
              />
            </div>
            
            <div className="form-field">
              <label>Notes</label>
              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
              />
            </div>
            
            <button 
              className="request-booking-btn" 
              onClick={handleRequestBooking}
            >
              Request Booking
            </button>
          </div>
        </div>
      </div>
      
      <div className="navigation">
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default BookingGuideBooking;