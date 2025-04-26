import React, { useState } from 'react';
import './TouristProfile.css';

const TouristProfile = ({ userData }) => {
  // Default user data if none provided
  const defaultUser = {
    firstName: 'Andrew',
    lastName: 'Turing',
    timeZone: '+5 GMT',
    phone: '555-237-2384',
    email: 'andrew.turing@cryptographyinc.com',
    country: 'United States'
  };

  // Use provided userData or default
  const user = { ...defaultUser, ...userData };
  
  // State for tracking which fields are being edited
  const [editableFields, setEditableFields] = useState({
    firstName: false,
    lastName: false,
    timeZone: false,
    phone: false,
    email: false,
    country: false
  });

  // State for password change modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordStep, setPasswordStep] = useState(1); // 1 = current password, 2 = new password

  // State for user data changes
  const [formData, setFormData] = useState(user);
  
  // Handle editing toggle for individual fields
  const toggleEdit = (field) => {
    setEditableFields({
      ...editableFields,
      [field]: !editableFields[field]
    });
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
    // Clear any error messages when user starts typing
    setPasswordError('');
  };

  // Verify current password and move to next step
  const verifyCurrentPassword = () => {
    // This is where you would typically validate against backend
    // For demo purposes, let's assume "password123" is the current password
    if (passwordData.currentPassword === "password123") {
      setPasswordStep(2);
      setPasswordError('');
    } else {
      setPasswordError('Current password is incorrect');
    }
  };

  // Change password
  const changePassword = () => {
    // Validate passwords match
    if (passwordData.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    // Password change logic here (would typically be an API call)
    console.log('Password changed successfully');
    setPasswordSuccess('Password changed successfully!');
    
    // Reset form after short delay
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordStep(1);
      setPasswordSuccess('');
    }, 2000);
  };

  // Handle save changes for individual fields
  const saveField = (field) => {
    toggleEdit(field);
    // You would typically make an API call here to update the backend
    console.log(`Saved ${field}: ${formData[field]}`);
  };

  // Handle logout
  const handleLogout = () => {
    console.log('User logged out');
    // Add your logout logic here
  };

  // Countries list
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 
    'Germany', 'France', 'Japan', 'India', 'Brazil', 'South Africa'
  ];

  // Time zone options
  const timeZones = [
    '+5 GMT', 'UTC', 'GMT', 'EST', 'CST', 'MST', 'PST', 
    'AEST', 'JST', 'IST', 'CET', 'EET'
  ];

  return (
    <div className="tprofile-container">
      <div className="tprofile-header">
        <h1>My Profile</h1>
        <div className="tprofile-action-buttons">
          <button className="tprofile-logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>

      <div className="tprofile-content">
        <div className="tprofile-sidebar">
          <div className="tprofile-avatar">
            <div className="tprofile-avatar-placeholder">
              {formData.firstName[0]}{formData.lastName[0]}
            </div>
          </div>
          <button className="tprofile-password-change-btn" onClick={() => setShowPasswordModal(true)}>
            Change Password
          </button>
        </div>

        <div className="tprofile-main">
          <div className="tprofile-section tprofile-personal-info">
            <h2>Personal Information</h2>
            <div className="tprofile-field-grid">
              {/* First Name Field */}
              <div className="tprofile-form-field">
                <label>FIRST NAME</label>
                <div className="tprofile-field-container">
                  {editableFields.firstName ? (
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  ) : (
                    <span className="tprofile-field-value">{formData.firstName}</span>
                  )}
                  <button 
                    className="tprofile-edit-btn"
                    onClick={() => editableFields.firstName ? saveField('firstName') : toggleEdit('firstName')}
                  >
                    {editableFields.firstName ? 'Save' : 'Edit'}
                  </button>
                </div>
              </div>
              
              {/* Last Name Field */}
              <div className="tprofile-form-field">
                <label>LAST NAME</label>
                <div className="tprofile-field-container">
                  {editableFields.lastName ? (
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  ) : (
                    <span className="tprofile-field-value">{formData.lastName}</span>
                  )}
                  <button 
                    className="tprofile-edit-btn"
                    onClick={() => editableFields.lastName ? saveField('lastName') : toggleEdit('lastName')}
                  >
                    {editableFields.lastName ? 'Save' : 'Edit'}
                  </button>
                </div>
              </div>
              
              {/* Country Field */}
              <div className="tprofile-form-field">
                <label>COUNTRY</label>
                <div className="tprofile-field-container">
                  {editableFields.country ? (
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="tprofile-field-value">{formData.country}</span>
                  )}
                  <button 
                    className="tprofile-edit-btn"
                    onClick={() => editableFields.country ? saveField('country') : toggleEdit('country')}
                  >
                    {editableFields.country ? 'Save' : 'Edit'}
                  </button>
                </div>
              </div>
              
              {/* Time Zone Field */}
              <div className="tprofile-form-field">
                <label>TIME ZONE</label>
                <div className="tprofile-field-container">
                  {editableFields.timeZone ? (
                    <select 
                      name="timeZone"
                      value={formData.timeZone}
                      onChange={handleChange}
                    >
                      {timeZones.map(zone => (
                        <option key={zone} value={zone}>{zone}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="tprofile-field-value">{formData.timeZone}</span>
                  )}
                  <button 
                    className="tprofile-edit-btn"
                    onClick={() => editableFields.timeZone ? saveField('timeZone') : toggleEdit('timeZone')}
                  >
                    {editableFields.timeZone ? 'Save' : 'Edit'}
                  </button>
                </div>
              </div>
              
              {/* Phone Field */}
              <div className="tprofile-form-field">
                <label>PHONE</label>
                <div className="tprofile-field-container">
                  {editableFields.phone ? (
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  ) : (
                    <span className="tprofile-field-value">{formData.phone}</span>
                  )}
                  <button 
                    className="tprofile-edit-btn"
                    onClick={() => editableFields.phone ? saveField('phone') : toggleEdit('phone')}
                  >
                    {editableFields.phone ? 'Save' : 'Edit'}
                  </button>
                </div>
              </div>
              
              {/* Email Field */}
              <div className="tprofile-form-field">
                <label>EMAIL ADDRESS</label>
                <div className="tprofile-field-container">
                  {editableFields.email ? (
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <span className="tprofile-field-value">{formData.email}</span>
                  )}
                  <button 
                    className="tprofile-edit-btn"
                    onClick={() => editableFields.email ? saveField('email') : toggleEdit('email')}
                  >
                    {editableFields.email ? 'Save' : 'Edit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Thank You Section with Background Image */}
          <div className="tprofile-section tprofile-thank-you-section">
            <div className="tprofile-thank-you-content">
              <h2>Thank You For Being With Us!</h2>
              <p>We appreciate your continued support and trust in our services.</p>
              <p>If you need any assistance, please don't hesitate to contact our support team.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="tprofile-modal-overlay">
          <div className="tprofile-modal-content">
            <div className="tprofile-modal-header">
              <h3>Change Password</h3>
              <button className="tprofile-close-btn" onClick={() => {
                setShowPasswordModal(false);
                setPasswordData({
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: ''
                });
                setPasswordStep(1);
                setPasswordError('');
                setPasswordSuccess('');
              }}>×</button>
            </div>
            <div className="tprofile-modal-body">
              {passwordSuccess ? (
                <div className="tprofile-success-message">{passwordSuccess}</div>
              ) : (
                <>
                  {passwordStep === 1 ? (
                    <div className="tprofile-password-step">
                      <div className="tprofile-form-field">
                        <label>CURRENT PASSWORD</label>
                        <input 
                          type="password" 
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="tprofile-password-input"
                          placeholder="Enter your current password"
                        />
                      </div>
                      {passwordError && <div className="tprofile-error-message">{passwordError}</div>}
                      <div className="tprofile-modal-actions">
                        <button 
                          className="tprofile-primary-btn" 
                          onClick={verifyCurrentPassword}
                          disabled={!passwordData.currentPassword}
                        >
                          Continue
                        </button>
                        <button 
                          className="tprofile-secondary-btn" 
                          onClick={() => setShowPasswordModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="tprofile-password-step">
                      <div className="tprofile-form-field">
                        <label>NEW PASSWORD</label>
                        <input 
                          type="password" 
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="tprofile-password-input"
                          placeholder="Enter new password"
                        />
                        <small className="tprofile-password-hint">Password must be at least 8 characters</small>
                      </div>
                      <div className="tprofile-form-field">
                        <label>CONFIRM NEW PASSWORD</label>
                        <input 
                          type="password" 
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="tprofile-password-input"
                          placeholder="Confirm new password"
                        />
                      </div>
                      {passwordError && <div className="tprofile-error-message">{passwordError}</div>}
                      <div className="tprofile-modal-actions">
                        <button 
                          className="tprofile-primary-btn" 
                          onClick={changePassword}
                          disabled={!passwordData.newPassword || !passwordData.confirmPassword}
                        >
                          Change Password
                        </button>
                        <button 
                          className="tprofile-secondary-btn" 
                          onClick={() => {
                            setPasswordStep(1);
                            setPasswordData({
                              ...passwordData,
                              newPassword: '',
                              confirmPassword: ''
                            });
                          }}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristProfile;