import React, { useState } from 'react';
import './EditPackagefrom.css'; // You'll need to create this CSS file

function SimplifiedTourForm() {
  const [formData, setFormData] = useState({
    packageId: '',
    name: '',
    destination: '',
    price: '',
    description: '',
    startDate: '',
    endDate: '',
    tourGuideName: '',
    tourType: '',
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', message: '' });
  const [showPreview, setShowPreview] = useState(false);

  const tourTypes = [
    'Adventure', 'Beach', 'Cultural', 'Family', 'Luxury', 
    'Wildlife', 'Cruise', 'Hiking', 'Historical', 'Honeymoon'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Updated form data:', formData);
      setSubmitMessage({ 
        type: 'success', 
        message: 'Tour package updated successfully!' 
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">Update Tour Package</h1>
          <p className="form-subtitle">Edit the form below to update the tour package</p>
        </div>
        
        {submitMessage.message && (
          <div className={`form-message ${submitMessage.type === 'success' ? 'success-message' : 'error-message'}`}>
            {submitMessage.message}
          </div>
        )}
        
        <div className="form-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="packageId">
                  Package ID
                </label>
                <input
                  type="text"
                  id="packageId"
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Package Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="destination">
                  Destination
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="price">
                  Price
                </label>
                <div className="price-input-container">
                  <span className="price-symbol">$</span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="price-input"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="startDate">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="endDate">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="tourGuideName">
                  Tour Guide Name
                </label>
                <input
                  type="text"
                  id="tourGuideName"
                  name="tourGuideName"
                  value={formData.tourGuideName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="tourType">
                  Tour Type
                </label>
                <select
                  id="tourType"
                  name="tourType"
                  value={formData.tourType}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Tour Type</option>
                  {tourTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-group full-width">
              <label className="form-label" htmlFor="description">
                Package Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="form-textarea"
                required
                placeholder="Describe the tour package, attractions, and what visitors can expect..."
              />
            </div>
            
            <div className="form-group full-width">
              <label className="form-label">
                Package Image
              </label>
              <div className="image-upload-container">
                <div className="image-upload-area">
                  <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="upload-text">
                    Drag and drop your image here or
                  </p>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden-input"
                  />
                  <label
                    htmlFor="image"
                    className="browse-button"
                  >
                    Browse Files
                  </label>
                </div>
                
                {previewImage && (
                  <div className="image-preview-container">
                    <div className="image-preview">
                      <img
                        src={previewImage}
                        alt="Package preview"
                        className="preview-image"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData({...formData, image: null});
                        }}
                        className="remove-image-button"
                      >
                        <svg className="remove-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {showPreview && (
              <div className="package-preview">
                <div className="preview-image-container">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Package preview" 
                      className="preview-image-full"
                    />
                  ) : (
                    <div className="preview-placeholder">
                      <svg className="placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  {formData.tourType && (
                    <span className="tour-type-badge">
                      {formData.tourType}
                    </span>
                  )}
                </div>
                
                <div className="preview-content">
                  <h3 className="preview-title">{formData.name || 'Tour Package Name'}</h3>
                  <p className="preview-destination">{formData.destination || 'Destination'}</p>
                  
                  <div className="preview-dates">
                    <svg className="date-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      {formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Start Date'} - {formData.endDate ? new Date(formData.endDate).toLocaleDateString() : 'End Date'}
                    </span>
                  </div>
                  
                  <p className="preview-description">
                    {formData.description || 'No description provided'}
                  </p>
                  
                  <div className="preview-footer">
                    <span className="preview-price">
                      {formData.price ? `$${formData.price}` : '$0.00'}
                    </span>
                    <span className="preview-guide">
                      Guide: {formData.tourGuideName || 'Not assigned'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="form-actions">
              <button
                type="submit"
                className="update-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="button-loading">
                    <svg className="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Update Tour Package'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SimplifiedTourForm;