import React, { useState, useEffect } from 'react';
import './AddEvent.css';

const AddEvent = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    eventName: '',
    eventCategory: '',
    eventDescription: '',
    eventImage: null,
    imagePreview: null,
    venue: '',
    startDateTime: '',
    ticketPrice: '',
    organizerContact: '',
    websiteLink: ''
  });

  // Load events from localStorage on component mount
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);
  

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          eventImage: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      eventName: '',
      eventCategory: '',
      eventDescription: '',
      eventImage: null,
      imagePreview: null,
      venue: '',
      startDateTime: '',
      ticketPrice: '',
      organizerContact: '',
      websiteLink: ''
    });
    setEditingEvent(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new event object
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now().toString(),
      eventName: formData.eventName,
      eventCategory: formData.eventCategory,
      eventDescription: formData.eventDescription,
      imagePreview: formData.imagePreview,
      venue: formData.venue,
      startDateTime: formData.startDateTime,
      ticketPrice: formData.ticketPrice || 'Free',
      organizerContact: formData.organizerContact,
      websiteLink: formData.websiteLink,
      createdAt: editingEvent ? editingEvent.createdAt : new Date().toISOString()
    };

    if (editingEvent) {
      // Update existing event
      const updatedEvents = events.map(event => 
        event.id === editingEvent.id ? newEvent : event
      );
      setEvents(updatedEvents);
    } else {
      // Add new event
      setEvents([...events, newEvent]);
    }

    // Reset form
    resetForm();
    
    // Switch to view tab after adding/editing
    setActiveTab('view');
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      eventName: event.eventName,
      eventCategory: event.eventCategory,
      eventDescription: event.eventDescription,
      eventImage: null,
      imagePreview: event.imagePreview,
      venue: event.venue,
      startDateTime: event.startDateTime,
      ticketPrice: event.ticketPrice === 'Free' ? '' : event.ticketPrice,
      organizerContact: event.organizerContact,
      websiteLink: event.websiteLink
    });
    setActiveTab('add');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  return (
    <div className="event-manager">
      <div className="tab-container">
        <div 
          className={`tab ${activeTab === 'add' ? 'active' : ''}`} 
          onClick={() => setActiveTab('add')}
        >
          {editingEvent ? 'Edit Event' : 'Add Event'}
        </div>
        <div 
          className={`tab ${activeTab === 'view' ? 'active' : ''}`} 
          onClick={() => {resetForm(); setActiveTab('view');}}
        >
          View Events
        </div>
      </div>
      
      {activeTab === 'add' ? (
        <div className="form-container">
          <h2>{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Event Details</h3>
              <div className="form-group">
                <label htmlFor="eventName">Event Name *</label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="eventCategory">Event Category *</label>
                <select
                  id="eventCategory"
                  name="eventCategory"
                  value={formData.eventCategory}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select Category --</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sightseeing">Sightseeing</option>
                  <option value="Food">Food</option>
                  <option value="Music">Music</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="eventDescription">Event Description *</label>
                <textarea
                  id="eventDescription"
                  name="eventDescription"
                  rows="4"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="eventImage">Event Image *</label>
                <input
                  type="file"
                  id="eventImage"
                  name="eventImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                  required={!formData.imagePreview}
                />
                {formData.imagePreview && (
                  <div className="image-preview">
                    <img src={formData.imagePreview} alt="Event preview" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="form-section">
              <h3>Location & Date</h3>
              <div className="form-group">
                <label htmlFor="venue">Venue/Location *</label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="startDateTime">Event Start Date & Time *</label>
                <input
                  type="datetime-local"
                  id="startDateTime"
                  name="startDateTime"
                  value={formData.startDateTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-section">
              <h3>Booking & Pricing</h3>
              <div className="form-group">
                <label htmlFor="ticketPrice">Ticket Price</label>
                <input
                  type="number"
                  id="ticketPrice"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="Leave empty for free event"
                />
              </div>
            </div>
            
            <div className="form-section">
              <h3>Organizer Details</h3>
              <div className="form-group">
                <label htmlFor="organizerContact">Organizer Contact Number *</label>
                <input
                  type="tel"
                  id="organizerContact"
                  name="organizerContact"
                  value={formData.organizerContact}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="websiteLink">Website/Social Media Link</label>
                <input
                  type="url"
                  id="websiteLink"
                  name="websiteLink"
                  value={formData.websiteLink}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={resetForm}>
                {editingEvent ? 'Cancel Edit' : 'Clear Form'}
              </button>
              <button type="submit" className="submit-btn">
                {editingEvent ? 'Update Event' : 'Add Event'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="events-list">
          <h2>All Events</h2>
          {events.length === 0 ? (
            <div className="no-events">No events added yet. Click on "Add Event" to create one.</div>
          ) : (
            <div className="events-grid">
              {events.map(event => (
                <div className="event-card" key={event.id}>
                  <div className="event-image">
                    {event.imagePreview ? (
                      <img src={event.imagePreview} alt={event.eventName} />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>
                  <div className="event-details">
                    <h3>{event.eventName}</h3>
                    <span className="event-category">{event.eventCategory}</span>
                    <p className="event-description">{event.eventDescription.length > 100 ? 
                      `${event.eventDescription.substring(0, 100)}...` : 
                      event.eventDescription}
                    </p>
                    <div className="event-meta">
                      <div><i className="icon-location"></i> {event.venue}</div>
                      <div><i className="icon-calendar"></i> {new Date(event.startDateTime).toLocaleString()}</div>
                      <div><i className="icon-ticket"></i> {event.ticketPrice}</div>
                    </div>
                    <div className="event-actions">
                      <button className="edit-btn" onClick={() => handleEdit(event)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(event.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddEvent;