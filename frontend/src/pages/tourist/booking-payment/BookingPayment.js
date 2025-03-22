import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./BookingPayment.css";

const BookingPayment = () => {
  const [bookings, setBookings] = useState([
    { id: "BH0001", category: "Hotel", description: "Brown place hotel", amount: 51.0 },
    { id: "BV0001", category: "Vehicle", description: "BMW I7", amount: 47.0 },
  ]);

  const totalAmount = 75000;
  const serviceCharge = 10000;
  const totalSummary = totalAmount + serviceCharge;

  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  return (
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
        <button className="pay-button">Pay Now</button>
      </div>
    </div>
  );
};

export default BookingPayment;
