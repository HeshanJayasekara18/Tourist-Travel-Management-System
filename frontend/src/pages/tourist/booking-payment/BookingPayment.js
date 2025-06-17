import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./BookingPayment.css";

const BookingPayment = () => {
  const [bookings, setBookings] = useState([
    { id: "BH0001", category: "Hotel", description: "Brown place hotel", amount: 51.0 },
    { id: "BV0001", category: "Vehicle", description: "BMW I7", amount: 47.0 },
  ]);

  const [loading, setLoading] = useState(false);

  const totalAmount = 75000;
  const serviceCharge = 10000;
  const totalSummary = totalAmount + serviceCharge;

  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const handlePayment = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      alert("Payment successful!");
    }, 2000);
  };

  return (
    <>
      {/* Progress Steps Component */}
      <div className="progress-steps-container">
        <div className="progress-line"></div>
        <div className="completed-line" style={{ width: '80%' }}></div>
        <div className="steps-wrapper">
          {[
            "Plan Your Tour",
            "Select Vehicle",
            "Select Hotels",
            "Select Guide",
            "Confirm & Pay"
          ].map((step, index) => (
            <div className="step-item" key={index}>
              <div 
                className={`step-circle ${
                  index + 1 < 5 ? 'completed' : 
                  index + 1 === 5 ? 'active' : ''
                }`}
              >
                {index + 1 < 5 ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  index + 1
                )}
              </div>
              <div 
                className={`step-label ${
                  index + 1 < 5 ? 'completed' : 
                  index + 1 === 5 ? 'active' : ''
                }`}
              >
                {step}
              </div>
            </div>
          ))}
        </div>
      </div>
    
    <div className="container">
      {/* Booking Table */}
      <div className="booking-table">
        <table>
          <thead>
            <tr>
              <th>Booking Id</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.category}</td>
                <td>{booking.description}</td>
                <td className="amount">${booking.amount.toFixed(2)}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon"
                    onClick={() => handleDelete(booking.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <p>Total Amount : Rs {totalAmount.toLocaleString()}</p>
        <p>Total Charge of CeylonGo : Rs {serviceCharge.toLocaleString()}</p>
        <p><strong>Total Summary : Rs {totalSummary.toLocaleString()}</strong></p>
          
          <button 
            className={`pay-button ${loading ? 'loading' : ''}`}
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Processing...
              </>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingPayment;
