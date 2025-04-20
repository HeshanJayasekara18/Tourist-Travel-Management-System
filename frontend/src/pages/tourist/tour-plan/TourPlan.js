import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./TourPlan.css";

const getPlaceName = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    return data.address?.country === "Sri Lanka"
      ? data.address.city || data.address.town || data.address.village || "Unknown Location"
      : "Invalid Location";
  } catch (error) {
    console.error("Error fetching place name:", error);
    return "Unknown Location";
  }
};

const getCoordinates = async (place) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${place},Sri Lanka`
    );
    const data = await response.json();
    return data.length > 0 ? { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) } : null;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

const calculateDistance = (coords) => {
  let totalDistance = 0;
  for (let i = 1; i < coords.length; i++) {
    const [lat1, lon1] = coords[i - 1];
    const [lat2, lon2] = coords[i];
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    totalDistance += R * c;
  }
  return totalDistance.toFixed(2);
};

const MapClickHandler = ({ setDestinations, setCoordinates }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const placeName = await getPlaceName(lat, lng);
      if (placeName !== "Invalid Location") {
        setDestinations((prev) => [...prev, { name: placeName, coords: [lat, lng] }]);
        setCoordinates((prev) => [...prev, [lat, lng]]);
      }
    },
  });
  return null;
};

const TourPlan = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const totalKm = calculateDistance(coordinates);
  const totalCost = (totalKm * 3).toFixed(2);

  useEffect(() => {
    if (destinations.length > 0 && !startDate) {
      setStartDate(new Date().toISOString().split("T")[0]);
    }
  }, [destinations, startDate]);

  useEffect(() => {
    if (destinations.length > 1 && !endDate) {
      setEndDate(new Date().toISOString().split("T")[0]);
    }
  }, [destinations, endDate]);

  const addDestination = async () => {
    if (location) {
      const coords = await getCoordinates(location);
      if (coords) {
        setDestinations((prev) => [...prev, { name: location, coords: [coords.lat, coords.lon] }]);
        setCoordinates((prev) => [...prev, [coords.lat, coords.lon]]);
        setLocation("");
      }
    }
  };

  const removeDestination = (index) => {
    setDestinations(destinations.filter((_, i) => i !== index));
    setCoordinates(coordinates.filter((_, i) => i !== index));
  };

  return (
    <div className="tour-page-h">
      <div className="map-container-h">
        <MapContainer center={[7.8731, 80.7718]} zoom={7} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler setDestinations={setDestinations} setCoordinates={setCoordinates} />
          {coordinates.map((coord, index) => (
            <Marker key={index} position={coord} icon={new L.Icon({ iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png" })}>
              <Popup>{destinations[index]?.name}</Popup>
            </Marker>
          ))}
          <Polyline positions={coordinates} color="blue" />
        </MapContainer>
      </div>

      <div className="tour-booking-container-h">
        <h2>Plan Your Tour</h2>
        <div className="input-group-h">
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => {
            if (e.target.value < startDate) {
              alert("End date cannot be earlier than the start date.");
            } else {
              setEndDate(e.target.value);
            }
          }} />
        </div>
        <div className="location-input-h">
          <label>Search Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          <button onClick={addDestination}>+</button>
        </div>
        <div className="selected-info-container-h">
          <h3>Selected Places</h3>
          <ul>
            {destinations.map((place, index) => (
              <li key={index}>{place.name} <button onClick={() => removeDestination(index)}>Remove</button></li>
            ))}
          </ul>
        </div>
        <p>Total Distance: {totalKm} km</p>
        <p>Total Cost: ${totalCost}</p>
        <button className="proceed-button-h">Proceed</button>
      </div>
    </div>
  );
};

export default TourPlan;
