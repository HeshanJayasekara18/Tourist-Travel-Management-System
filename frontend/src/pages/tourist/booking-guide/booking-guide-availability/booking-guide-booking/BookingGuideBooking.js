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
    <div className="tour-booking-container-h">
      <h1 className="availability-title-h">Availability</h1>
      
      <div className="booking-content-h">
        <div className="tour-guide-card-h">
          <img 
            src="/guide-profile.jpg" 
            alt="Tour guide profile" 
            className="guide-image-h" 
          />
          
          <div className="rating-h">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="star-h">★</span>
            ))}
          </div>
          
          <h3 className="guide-name-h">Saman kumara</h3>
          <p className="guide-price-h">$2700 / Day</p>
          
          <div className="guide-details-h">
            <p className="guide-languages-h">
              <strong>Languages - </strong>
              English, France
            </p>
          </div>
          
          <button className="view-profile-btn-h">View Profile</button>
        </div>
        
        <div className="booking-form-h">
          
          <div className="booking-period-h">
            <h3>Booking Period</h3>
            
            <div className="date-inputs-h">
              <div className="date-field-h">
                <label>Start Date</label>
                <div className="date-input-container-h">
                  <span className="calendar-icon-h">📅</span>
                  <input 
                    type="text" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="date-field-h">
                <label>End Date</label>
                <div className="date-input-container-h">
                  <span className="calendar-icon-h">📅</span>
                  <input 
                    type="text" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="tour-details-h">
            <h3>Enter Your Tour Details</h3>
            
            <div className="form-field-h">
              <label>Full Name</label>
              <input 
                type="text" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
              />
            </div>
            
            <div className="form-field-h">
              <label>Contact Number</label>
              <input 
                type="text" 
                value={contactNumber} 
                onChange={(e) => setContactNumber(e.target.value)} 
              />
            </div>
            
            <div className="form-field-h">
              <label>Notes</label>
              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
              />
            </div>
            
            <button 
              className="request-booking-btn-h" 
              onClick={handleRequestBooking}
            >
              Request Booking
            </button>
          </div>
        </div>
      </div>
      
      <div className="navigation-h">
        <button className="next-btn-h">Next</button>
      </div>
    </div>
  );
};

export default BookingGuideBooking;
