import React, { useState } from "react";
import "./TourPlan.css";

const TourPlan = () => {
  const [startDate, setStartDate] = useState("2025/02/12");
  const [endDate, setEndDate] = useState("2025/02/18");
  const [location, setLocation] = useState("Colombo");
  const [destinations, setDestinations] = useState(["Badulla", "Nuwara Eliya"]);

  const addDestination = () => {
    if (location && !destinations.includes(location)) {
      setDestinations([...destinations, location]);
      setLocation("");
    }
  };

  const removeDestination = (index) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };

  return (
    <div className="tour-booking-container-h">
      <div className="input-group-h">
        <label>Start Date</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>End Date</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <div className="location-input-h">
        <label>Search Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={addDestination}>+</button>
      </div>

      <div className="destinations-list-h">
        {destinations.map((dest, index) => (
          <div key={index} className="destination-item-h">
            {dest}
            <button className="remove-btn-h" onClick={() => removeDestination(index)}>❌</button>
          </div>
        ))}
      </div>

      <div className="summary-h">
        <h3>Your Tour Summary</h3>
        <p className="hh-h">
          <strong className="start-from-h">Start from:</strong> Colombo &nbsp;&nbsp;
          <strong className="start-date-h">Start Date:</strong> {startDate}
        </p>
        <p>
          <strong>Destinations:</strong>
        </p>
        <ul className="destination-list-h">
          {destinations.map((dest, index) => (
            <li key={index}>{dest}</li>
          ))}
        </ul>
        <p>
          <strong>Total Distance:</strong> 300km &nbsp;&nbsp;
          <strong className="end-date-h">End Date:</strong> {endDate}
        </p>
      </div>

      <button className="proceed-button-h">Proceed</button>
    </div>
  );
};

export default TourPlan;
