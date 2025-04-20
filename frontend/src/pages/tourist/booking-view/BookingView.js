import { useState, useEffect } from "react";
import axios from "axios";
import "./BookingView.css";

export default function TableComponent() {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    booking_type: "",
    name: "",
    start_date: "",
    end_date: "",
    mobile_number: "",
    booking_date: "",
    booking_time: ""
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/booking");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleEdit = (booking) => {
    setEditingId(booking.bookingID);
    setEditForm({
      booking_type: booking.booking_type,
      name: booking.name,
      start_date: booking.start_date ? booking.start_date.split("T")[0] : "",
      end_date: booking.end_date ? booking.end_date.split("T")[0] : "",
      mobile_number: booking.mobile_number.toString(),
      booking_date: booking.booking_date ? booking.booking_date.split("T")[0] : "",
      booking_time: booking.booking_time
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (id) => {
    try {
      const formattedData = {
        booking_type: editForm.booking_type,
        name: editForm.name,
        start_date: new Date(editForm.start_date).toISOString(),
        end_date: new Date(editForm.end_date).toISOString(),
        mobile_number: Number(editForm.mobile_number),
        booking_date: new Date(editForm.booking_date).toISOString(),
        booking_time: editForm.booking_time
      };
      
      await axios.put(`http://localhost:4000/api/booking/${id}`, formattedData);
      setBookings(bookings.map(booking => booking.bookingID === id ? { ...booking, ...formattedData } : booking));
      setEditingId(null);
      alert("Booking updated successfully!");
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/booking/${id}`);
      setBookings(bookings.filter(booking => booking.bookingID !== id));
      alert("Booking deleted successfully!");
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="table-container-h">
      <table className="styled-table-h">
        <thead>
          <tr>
            <th className="header-cell-h">Booking Type</th>
            <th className="header-cell-h">Hotel Name</th>
            <th className="header-cell-h">Start Date</th>
            <th className="header-cell-h">End Date</th>
            <th className="header-cell-h">Mobile Number</th>
            <th className="header-cell-h">Booking Date</th>
            <th className="header-cell-h">Booking Time</th>
            <th className="header-cell-h">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr><td colSpan="7" className="cell-h">No bookings found</td></tr>
          ) : (
            bookings.map(booking => (
              <tr key={booking.bookingID}>
                {editingId === booking.bookingID ? (
                  <>
                    <td className="cell-h"><input type="text" name="booking_type" value={editForm.booking_type} onChange={handleChange} /></td>
                    <td className="cell-h"><input type="text" name="name" value={editForm.name} onChange={handleChange} /></td>
                    <td className="cell-h"><input type="date" name="start_date" value={editForm.start_date} onChange={handleChange} /></td>
                    <td className="cell-h"><input type="date" name="end_date" value={editForm.end_date} onChange={handleChange} /></td>
                    <td className="cell-h"><input type="text" name="mobile_number" value={editForm.mobile_number} onChange={handleChange} /></td>
                    <td className="cell-h"><input type="date" name="booking_date" value={editForm.booking_date} onChange={handleChange} /></td>
                    <td className="cell-h"><input type="text" name="booking_time" value={editForm.booking_time} onChange={handleChange} /></td>
                    <td className="cell-h">
                      <button onClick={() => handleSubmit(booking.bookingID)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="cell-h">{booking.booking_type}</td>
                    <td className="cell-h">{booking.name}</td>
                    <td className="cell-h">{booking.start_date}</td>
                    <td className="cell-h">{booking.end_date}</td>
                    <td className="cell-h">{booking.mobile_number}</td>
                    <td className="cell-h">{booking.booking_date}</td>
                    <td className="cell-h">{booking.booking_time}</td>
                    <td className="cell-h">
                      <button onClick={() => handleEdit(booking)}>Edit</button>
                      <button onClick={() => handleDelete(booking.bookingID)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
