import React, { useEffect, useState } from 'react';
import './EditPackagefrom.css'; // You'll need to create this CSS file
import axios from 'axios';

function SimplifiedTourForm({packageData}) {
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (packageData) {
      setFormData({
        packageId: packageData.packageId || '',
        name: packageData.name || '',
        destination: packageData.destination || '',
        price: packageData.price || '',
        description: packageData.description || '',
        startDate: packageData.startDate ? packageData.startDate.slice(0, 10) : '', // Format Fix
        endDate: packageData.endDate ? packageData.endDate.slice(0, 10) : '', // Format Fix
        tourGuideName: packageData.tourGuideName || '',
        tourType: packageData.tourType || '',
        image: null
      });
  
      if (packageData.image) {
        setPreviewImage(packageData.image);
      }
    }
  }, [packageData]);
  

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
    
    // Clear validation error for this field when user changes value
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
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
      
      // Clear image validation error if it exists
      if (validationErrors.image) {
        setValidationErrors({
          ...validationErrors,
          image: ''
        });
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Required validation for all fields
    Object.keys(formData).forEach(key => {
      if (key === 'image') {
        // Only require image if no previewImage exists (could be existing image)
        if (!formData.image && !previewImage) {
          errors.image = 'Please select an image for the package';
        }
      } else if (!formData[key]) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
    
    // Validate price is a positive number
    if (formData.price && (isNaN(formData.price) || parseFloat(formData.price) <= 0)) {
      errors.price = 'Price must be a positive number';
    }
    
    // We removed the date comparison validation as requested
    // Only checking that dates are provided
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Validate form before submitting
      if (!validateForm()) {
        // Scroll to the first error
        const firstErrorField = document.querySelector('.error-message');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      setIsSubmitting(true);
  
      try {
          const formDataToSend = new FormData();
          formDataToSend.append("packageId", formData.packageId);
          formDataToSend.append("name", formData.name);
          formDataToSend.append("destination", formData.destination);
          formDataToSend.append("price", formData.price);
          formDataToSend.append("description", formData.description);
          formDataToSend.append("startDate", formData.startDate);
          formDataToSend.append("endDate", formData.endDate);
          formDataToSend.append("tourGuideName", formData.tourGuideName);
          formDataToSend.append("tourType", formData.tourType);
          
          if (formData.image) {
              formDataToSend.append("image", formData.image);
          }
  
          const response = await axios.put(
              `http://localhost:4000/api/tourPackage/${packageData.tp_Id}`,
              formDataToSend,
              {
                  headers: {
                      "Content-Type": "multipart/form-data",
                  },
              }
          );
  
          console.log('Server response:', response.data);
          setSubmitMessage({ type: 'success', message: 'Tour package updated successfully!' });
          
          // Show success message as alert also
          alert("Tour package updated successfully!");
  
      } catch (error) {
          console.error("Error updating package:", error);
          setSubmitMessage({ 
              type: 'error', 
              message: error.response?.data?.message || 'Failed to update package.' 
          });
      } finally {
          setIsSubmitting(false);
      }
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
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className={`form-group ${validationErrors.packageId ? 'has-error' : ''}`}>
                <label className="form-label" htmlFor="packageId">
                  Package ID <span className="required-mark">*</span>
                </label>
                <input
                  type="text"
                  id="packageId"
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleChange}
                  className={`form-input ${validationErrors.packageId ? 'error-input' : ''}`}
                  required
                />
                {validationErrors.packageId && (
                  <p className="error-message">{validationErrors.packageId}</p>
                )}
              </div>
              
              <div className={`form-group ${validationErrors.name ? 'has-error' : ''}`}>
                <label className="form-label" htmlFor="name">
                  Package Name <span className="required-mark">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${validationErrors.name ? 'error-input' : ''}`}
                  required
                />
                {validationErrors.name && (
                  <p className="error-message">{validationErrors.name}</p>
                )}
              </div>
              
              <div className={`form-group ${validationErrors.destination ? 'has-error' : ''}`}>
                <label className="form-label" htmlFor="destination">
                  Destination <span className="required-mark">*</span>
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className={`form-input ${validationErrors.destination ? 'error-input' : ''}`}
                  required
                />
                {validationErrors.destination && (
                  <p className="error-message">{validationErrors.destination}</p>
                )}
              </div>
              
              <div className={`form-group ${validationErrors.price ? 'has-error' : ''}`}>
                <label className="form-label" htmlFor="price">
                  Price <span className="required-mark">*</span>
                </label>
                <div className="price-input-container">
                  <span className="price-symbol">$</span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`price-input ${validationErrors.price ? 'error-input' : ''}`}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                {validationErrors.price && (
                  <p className="error-message">{validationErrors.price}</p>
                )}
              </div>
              
              <div className={`form-group ${validationErrors.startDate ? 'has-error' : ''}`}>
                <label className="form-label" htmlFor="startDate">
                  Start Date <span className="required-mark">*</span>
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`form-input ${validationErrors.startDate ? 'error-input' : ''}`}
                  required
                />
                {validationErrors.startDate && (
                  <p className="error-message">{validationErrors.startDate}</p>
                )}
              </div>
              
              <div className={`form-group ${validationErrors.endDate ? 'has-error' : ''}`}>
                <label className="form-label" htmlFor="endDate">
                  End Date <span className="required-mark">*</span>
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`form-input ${validationErrors.endDate ? 'error-input' : ''}`}
                  required
                />
                {validationErrors.endDate && (
                  <p className="error-message">{validationErrors.endDate}</p>
                )}
              </div>
              
              <div className={`form-group ${validationErrors.tourGuideName ? 'has-error' : ''}`}>
                <label className="form-label" htmlFor="tourGuideName">
                  Tour Guide Name <span className="required-mark">*</span>
                </label>
                <input
                  type="text"
                  id="tourGuideName"
                  name="tourGuideName"
                  value={formData.tourGuideName}
                  onChange={handleChange}
                  className={`form-input ${validationErrors.tourGuideName ? 'error-input' : ''}`}
                  required
                />
                {validationErrors.tourGuideName && (
                  <p className="error-message">{validationErrors.tourGuideName}</p>
                )}
              </div>
              
              <div className={`form-group ${validationErrors.tourType ? 'has-error' : ''}`}>
                <label className="form-label" htmlFor="tourType">
                  Tour Type <span className="required-mark">*</span>
                </label>
                <select
                  id="tourType"
                  name="tourType"
                  value={formData.tourType}
                  onChange={handleChange}
                  className={`form-select ${validationErrors.tourType ? 'error-input' : ''}`}
                  required
                >
                  <option value="">Select Tour Type</option>
                  {tourTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {validationErrors.tourType && (
                  <p className="error-message">{validationErrors.tourType}</p>
                )}
              </div>
            </div>
            
            <div className={`form-group full-width ${validationErrors.description ? 'has-error' : ''}`}>
              <label className="form-label" htmlFor="description">
                Package Description <span className="required-mark">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`form-textarea ${validationErrors.description ? 'error-input' : ''}`}
                required
                placeholder="Describe the tour package, attractions, and what visitors can expect..."
              />
              {validationErrors.description && (
                <p className="error-message">{validationErrors.description}</p>
              )}
            </div>
            
            <div className={`form-group full-width ${validationErrors.image ? 'has-error' : ''}`}>
              <label className="form-label">
                Package Image <span className="required-mark">*</span>
              </label>
              <div className={`image-upload-container ${validationErrors.image ? 'error-border' : ''}`}>
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
              {validationErrors.image && (
                <p className="error-message">{validationErrors.image}</p>
              )}
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
                type="button"
                className="preview-button"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
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