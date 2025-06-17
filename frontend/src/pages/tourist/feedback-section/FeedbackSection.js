<<<<<<< HEAD
import React, { useState } from 'react';
import './FeedbackSection.css';

const FeedbackSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitted(false);
    setFeedback('');
  };

  const handleSubmit = () => {
    if (feedback.trim()) {
      console.log('Feedback submitted:', feedback);
      setSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        closeModal();
      }, 3000);
    }
=======
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackSection.css';

const FeedbackSection = () => {
  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    // Navigate to the feedback form page
    navigate('/feedback');
>>>>>>> 47594b1bbefcd5aac04942da455a62b108f425a4
  };

  return (
    <div className="feedback-section">
      <div className="feedback-container">
        <h2>We Value Your Feedback</h2>
        <p>Share your thoughts with us and help us improve our services!</p>
        
<<<<<<< HEAD
        <button className="feedback-button" onClick={openModal}>
          Give Feedback
        </button>
      </div>

      {isModalOpen && (
        <div className="feedback-modal-overlay">
          <div className="feedback-modal">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h3>Your Feedback</h3>
            
            {!submitted ? (
              <>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you think..."
                  rows="5"
                />
                <button className="submit-button" onClick={handleSubmit}>
                  Submit
                </button>
              </>
            ) : (
              <div className="success-message">
                Thank you for your feedback! We appreciate your input.
              </div>
            )}
          </div>
        </div>
      )}
=======
        <button className="feedback-button" onClick={handleFeedbackClick}>
          Give Feedback
        </button>
      </div>
>>>>>>> 47594b1bbefcd5aac04942da455a62b108f425a4
    </div>
  );
};

export default FeedbackSection;