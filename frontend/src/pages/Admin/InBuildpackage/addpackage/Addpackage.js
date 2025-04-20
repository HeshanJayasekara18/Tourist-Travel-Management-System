import React, { useState, useEffect } from 'react';
import './Addpackage.css';
import axios from 'axios';

function Homepage() {

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', message: '' });
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});

  const tourTypes = [
    'Adventure', 'Beach', 'Cultural', 'Family', 'Luxury', 
    'Wildlife', 'Cruise', 'Hiking', 'Historical', 'Honeymoon'
  ];

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user makes changes
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validate image size and format
      const validFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validFormats.includes(file.type)) {
        setErrors({
          ...errors,
          image: 'Invalid file format. Please upload JPEG, PNG, JPG or GIF images only.'
        });
        return;
      }
      
      if (file.size > maxSize) {
        setErrors({
          ...errors,
          image: 'Image size exceeds 5MB. Please upload a smaller image.'
        });
        return;
      }
      
      // Clear image error if any
      if (errors.image) {
        setErrors({
          ...errors,
          image: ''
        });
      }
      
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

  const validateForm = () => {
    const newErrors = {};
    
    // Package ID validation
    if (!formData.packageId.trim()) {
      newErrors.packageId = 'Package ID is required';
    } else if (!/^[A-Za-z0-9-]+$/.test(formData.packageId)) {
      newErrors.packageId = 'Package ID should contain only letters, numbers and hyphens';
    }
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Package name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Package name must be at least 3 characters';
    }
    
    // Destination validation
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }
    
    // Price validation
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description should be at least 20 characters';
    }
    
    // Date validations - only checking if they are provided
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    
    // Tour guide validation
    if (!formData.tourGuideName.trim()) {
      newErrors.tourGuideName = 'Tour guide name is required';
    }
    
    // Tour type validation
    if (!formData.tourType) {
      newErrors.tourType = 'Please select a tour type';
    }
    
    // Image validation
    if (!formData.image && !previewImage) {
      newErrors.image = 'Please upload a package image';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form before submission
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const errorElement = document.getElementById(firstErrorField);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorElement.focus();
        }
      }
      return;
    }
    
    setIsSubmitting(true);
  
    // Create FormData for sending files
    const formDataToSend = new FormData();
    formDataToSend.append('packageId', formData.packageId);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('destination', formData.destination);
    formDataToSend.append('price', Number(formData.price));
    formDataToSend.append('description', formData.description);
    formDataToSend.append('startDate', new Date(formData.startDate).toISOString());
    formDataToSend.append('endDate', new Date(formData.endDate).toISOString());
    formDataToSend.append('tourGuideName', formData.tourGuideName);
    formDataToSend.append('tourType', formData.tourType);
  
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }  
    
    try {
      const response = await axios.post('http://localhost:4000/api/tourPackage', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });
  
      console.log('Response from server:', response.data);
  
      setSubmitMessage({
        type: 'success',
        message: 'Tour package added successfully!',
      });
  
      setPreviewImage(null);
      setShowPreview(false);
      alert("Package Added Success..");
      
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
      
    } catch (error) {
      console.error('Error saving data:', error.response ? error.response.data : error.message);
      setSubmitMessage({
          type: 'error',
          message: 'Failed to add tour package. Please try again.',
      });
    }
  
    setIsSubmitting(false);
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
              <form onSubmit={handleSubmit} noValidate>
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
                      className={`form-input ${errors.packageId ? 'input-error' : ''}`}
                      required
                    />
                    {errors.packageId && <div className="error-message">{errors.packageId}</div>}
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
                      className={`form-input ${errors.name ? 'input-error' : ''}`}
                      required
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
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
                      className={`form-input ${errors.destination ? 'input-error' : ''}`}
                      required
                    />
                    {errors.destination && <div className="error-message">{errors.destination}</div>}
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
                        className={`form-input form-input-with-padding ${errors.price ? 'input-error' : ''}`}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    {errors.price && <div className="error-message">{errors.price}</div>}
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
                      className={`form-input ${errors.startDate ? 'input-error' : ''}`}
                      required
                    />
                    {errors.startDate && <div className="error-message">{errors.startDate}</div>}
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
                      className={`form-input ${errors.endDate ? 'input-error' : ''}`}
                      required
                    />
                    {errors.endDate && <div className="error-message">{errors.endDate}</div>}
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
                      className={`form-input ${errors.tourGuideName ? 'input-error' : ''}`}
                      required
                    />
                    {errors.tourGuideName && <div className="error-message">{errors.tourGuideName}</div>}
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
                      className={`form-input ${errors.tourType ? 'input-error' : ''}`}
                      required
                    >
                      <option value="">Select Tour Type</option>
                      {tourTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.tourType && <div className="error-message">{errors.tourType}</div>}
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
                    className={`textarea ${errors.description ? 'input-error' : ''}`}
                    required
                    placeholder="Describe the tour package, attractions, and what visitors can expect..."
                  />
                  {errors.description && <div className="error-message">{errors.description}</div>}
                </div>
                
                {/* Image Upload */}
                <div className="image-upload-container">
                  <label className="form-label">
                    Package Image
                  </label>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div style={{flex: 1}}>
                      <div className={`file-drop-area ${errors.image ? 'file-drop-error' : ''}`}>
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
                      {errors.image && <div className="error-message">{errors.image}</div>}
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
                        setErrors({});
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
                {/* Package Summary - Keeping just the information but removing the heading and completion bar */}
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