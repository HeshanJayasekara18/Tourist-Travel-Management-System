import React, { useState } from 'react';
import './Addpackage.css';

function Homepage() {
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
      
      // Create a preview URL for the selected image
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
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log('Submitted form data:', formData);
      setSubmitMessage({ 
        type: 'success', 
        message: 'Tour package added successfully!' 
      });
      setIsSubmitting(false);
      
      // Reset form after successful submission
      setFormData({
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
      setPreviewImage(null);
      setShowPreview(false);
    }, 1500);
  };

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };
  
  return (
    <div className="container">
      <div className="wrapper">
        <div className="card">
          <div className="header">
            <h1 className="header-title">Add Tour Package</h1>
            <p className="header-subtitle">Complete the form below to add a new tour package</p>
          </div>
          
          {submitMessage.message && (
            <div className={submitMessage.type === 'success' ? 'alert-success' : 'alert-error'}>
              {submitMessage.message}
            </div>
          )}
          
          <div className="flex-row">
            {/* Left Side - Form */}
            <div className="form-section">
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  {/* Package ID */}
                  <div>
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
                  
                  {/* Package Name */}
                  <div>
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
                  
                  {/* Destination */}
                  <div>
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
                  
                  {/* Price */}
                  <div>
                    <label className="form-label" htmlFor="price">
                      Price
                    </label>
                    <div className="form-input-with-icon">
                      <span className="form-input-icon">$</span>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-input form-input-with-padding"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  {/* Start Date */}
                  <div>
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
                  
                  {/* End Date */}
                  <div>
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
                  
                  {/* Tour Guide Name */}
                  <div>
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
                  
                  {/* Tour Type */}
                  <div>
                    <label className="form-label" htmlFor="tourType">
                      Tour Type
                    </label>
                    <select
                      id="tourType"
                      name="tourType"
                      value={formData.tourType}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select Tour Type</option>
                      {tourTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Description */}
                <div className="form-group-full">
                  <label className="form-label" htmlFor="description">
                    Package Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="textarea"
                    required
                    placeholder="Describe the tour package, attractions, and what visitors can expect..."
                  />
                </div>
                
                {/* Image Upload */}
                <div className="image-upload-container">
                  <label className="form-label">
                    Package Image
                  </label>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div style={{flex: 1}}>
                      <div className="file-drop-area">
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
                          className="file-input"
                        />
                        <label
                          htmlFor="image"
                          className="browse-button"
                        >
                          Browse Files
                        </label>
                      </div>
                    </div>
                    
                    {previewImage && (
                      <div className="preview-container">
                        <div className="preview-image-wrapper">
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
                            className="remove-button"
                          >
                            <svg style={{width: '1rem', height: '1rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Interactive Controls */}
                <div className="button-container">
                  <div className="button-group">
                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      className="preview-button"
                    >
                      {showPreview ? "Hide Preview" : "Show Preview"}
                    </button>
                    <button
                      type="reset"
                      className="reset-button"
                      onClick={() => {
                        setFormData({
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
                        setPreviewImage(null);
                        setShowPreview(false);
                      }}
                    >
                      Reset Form
                    </button>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={isSubmitting ? "submit-button disabled-button" : "submit-button"}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <svg className="loading-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20">
                          <circle style={{opacity: 0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path style={{opacity: 0.75}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Add Tour Package'
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Right Side - Preview & Interactive Elements */}
            <div className="preview-section">
              <div className="sticky-container">
                <h2 className="section-heading">Package Information</h2>
                
                {/* Package Summary */}
                <div className="summary">
                  <h3 className="summary-title">Quick Summary</h3>
                  
                  <div style={{marginBottom: '1rem'}}>
                    <div className="summary-item">
                      <span className="summary-label">Package ID:</span>
                      <span className="summary-value">{formData.packageId || 'Not set'}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Destination:</span>
                      <span className="summary-value">{formData.destination || 'Not set'}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Price:</span>
                      <span className="summary-value">{formData.price ? `$${formData.price}` : 'Not set'}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Type:</span>
                      <span className="summary-value">{formData.tourType || 'Not set'}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Duration:</span>
                      <span className="summary-value">
                        {calculateDuration() > 0 ? `${calculateDuration()} days` : 'Not set'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Completion Status */}
                  <div className="progress-container">
                    <h4 className="progress-label">Form Completion</h4>
                    <div className="progress-bar">
                      <div 
                        className="progress-indicator"
                        style={{
                          width: `${Object.entries(formData).filter(([key, value]) => 
                            value && key !== 'image'
                          ).length / (Object.keys(formData).length - 1) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Full Preview */}
                {showPreview && (
                  <div className="package-preview">
                    <div className="preview-image-container">
                      {previewImage ? (
                        <img 
                          src={previewImage} 
                          alt="Package preview" 
                          className="preview-image-large"
                        />
                      ) : (
                        <div className="image-placeholder">
                          <svg className="placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      
                      {formData.tourType && (
                        <span className="type-badge">
                          {formData.tourType}
                        </span>
                      )}
                    </div>
                    
                    <div className="preview-content">
                      <h3 className="preview-title">{formData.name || 'Tour Package Name'}</h3>
                      <p className="preview-destination">{formData.destination || 'Destination'}</p>
                      
                      <div className="date-display">
                        <svg className="date-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="date-text">
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
                        <span className="guide-text">
                          Guide: {formData.tourGuideName || 'Not assigned'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Help Text */}
                <div className="tips-container">
                  <h3 className="tips-title">Tips:</h3>
                  <ul className="tips-list">
                    <li className="tips-item">• Add high-quality images for better visual appeal</li>
                    <li className="tips-item">• Write detailed descriptions to increase bookings</li>
                    <li className="tips-item">• Set competitive pricing based on market research</li>
                    <li className="tips-item">• Click "Show Preview" to see how your package will look</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;