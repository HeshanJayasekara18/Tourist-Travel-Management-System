import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const BookingHotelForm = ({ open, handleClose, getAllBooking }) => {
  const [formData, setFormData] = useState({
    bookingID: "",
    name: "",
    booking_type: "Hotel",
    booking_date: dayjs().format("YYYY-MM-DD"),
    booking_time: dayjs().format("HH:mm"),
    start_date: null,
    end_date: null,
    mobile_number: "",
  });

  const [errors, setErrors] = useState({});
  const [hotelNames, setHotelNames] = useState([]); // Store fetched hotel names

  useEffect(() => {
    if (open) {
      setFormData((prevData) => ({
        ...prevData,
        booking_date: dayjs().format("YYYY-MM-DD"),
      }));
      fetchHotelNames(); // Fetch hotel names when form opens
    }
  }, [open]);

  const fetchHotelNames = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/hotelrooms");
      const names = response.data.map(room => room.name); // Extract hotel names only
      setHotelNames(names);
    } catch (error) {
      console.error("Error fetching hotel names:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.start_date = formData.start_date ? "" : "Start date is required";
    tempErrors.end_date = formData.end_date ? "" : "End date is required";
    tempErrors.mobile_number =
      formData.mobile_number.length === 10 ? "" : "Mobile number must be 10 digits";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const BookHotel = (data) => {
    axios
      .post("http://localhost:4000/api/booking", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        alert("Successfully booked!");
        getAllBooking();
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding booking:", error.response ? error.response.data : error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const timeParts = formData.booking_time.split(":");
      const formattedTime = parseInt(timeParts[0]) * 100 + parseInt(timeParts[1]);

      const updatedFormData = {
        ...formData,
        bookingID: formData.bookingID || uuidv4(),
        booking_time: formattedTime,
      };

      BookHotel(updatedFormData);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={handleClose} className="booking-dialog-h">
        <DialogTitle>Hotel Booking Form</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Booking Type"
            name="booking_type"
            value={formData.booking_type}
            InputProps={{ readOnly: true }}
          />

          {/* Editable Hotel Name Field with Suggestions */}
          <TextField
            fullWidth
            margin="dense"
            label="Hotel Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            list="hotel-options" // This enables suggestions
          />
          <datalist id="hotel-options">
            {hotelNames.map((hotel, index) => (
              <option key={index} value={hotel} />
            ))}
          </datalist>

          <TextField
            fullWidth
            margin="dense"
            label="Booking Date"
            type="date"
            name="booking_date"
            value={formData.booking_date}
            InputProps={{ readOnly: true }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Booking Time"
            name="booking_time"
            value={formData.booking_time}
            InputProps={{ readOnly: true }}
          />

          <DatePicker
            label="Start Date"
            value={formData.start_date}
            onChange={(value) => handleDateChange("start_date", value)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="dense" error={!!errors.start_date} />
            )}
          />
          <DatePicker
            label="End Date"
            value={formData.end_date}
            onChange={(value) => handleDateChange("end_date", value)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="dense" error={!!errors.end_date} />
            )}
          />

          <TextField
            fullWidth
            margin="dense"
            label="Mobile Number"
            type="number"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            error={!!errors.mobile_number}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default BookingHotelForm;
