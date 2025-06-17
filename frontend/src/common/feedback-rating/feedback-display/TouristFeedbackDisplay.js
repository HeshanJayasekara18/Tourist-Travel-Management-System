// TouristFeedbackView.jsx
import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import './TouristFeedbackDisplay.css';

const TouristFeedbackDisplay = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedFeedback, setExpandedFeedback] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });

  // Get touristID from localStorage when component mounts
  useEffect(() => {
    const fetchTouristFeedbacks = async () => {
      setIsLoading(true);
      try {
        const touristID = localStorage.getItem('touristID');
        
        if (!touristID) {
          setError('Tourist ID not found. Please log in again.');
          setIsLoading(false);
          return;
        }

        // We need to fetch all feedbacks submitted by this tourist
        const response = await fetch(`http://localhost:4000/api/feedback/tourist/${touristID}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch your feedback submissions');
        }
        
        const data = await response.json();
        setFeedbacks(data.feedbacks);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTouristFeedbacks();
  }, []);

  // Apply sorting
  useEffect(() => {
    if (sortConfig.key) {
      setFeedbacks(prevFeedbacks => {
        return [...prevFeedbacks].sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
          return 0;
        });
      });
    }
  }, [sortConfig]);

  // Toggle sort direction
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No date available';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Render star rating
  const renderStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // Toggle expanded feedback
  const toggleExpandFeedback = (id) => {
    if (expandedFeedback === id) {
      setExpandedFeedback(null);
    } else {
      setExpandedFeedback(id);
    }
  };

  // Get response for a feedback
  const fetchFeedbackResponse = async (feedbackId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/feedback/${feedbackId}/response`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }
      
      const data = await response.json();
      
      // Update the feedbacks state with the response
      setFeedbacks(prevFeedbacks => 
        prevFeedbacks.map(item => 
          item._id === feedbackId 
            ? { ...item, adminResponse: data.adminResponse } 
            : item
        )
      );
      
    } catch (err) {
      console.error('Error fetching feedback response:', err);
    }
  };

  if (isLoading) {
    return <div className="loading-container-t">Loading your feedback submissions...</div>;
  }

  if (error) {
    return <div className="error-container-t">Error: {error}</div>;
  }

  return (
    <div className="tourist-feedback-container-t">
      <h2 className="feedback-title-t">Your Feedback Submissions</h2>
      
      {feedbacks.length === 0 ? (
        <div className="no-feedback-t">
          <MessageSquare size={48} className="no-feedback-icon-t" />
          <h3>You haven't submitted any feedback yet</h3>
          <p>Once you submit feedback for our services, they will appear here.</p>
        </div>
      ) : (
        <>
          <p className="feedback-count-t">You have submitted {feedbacks.length} feedback(s)</p>
          
          <div className="feedback-list-t">
            <div className="feedback-header-row-t">
              <div className="feedback-header-cell-t sortable-t" onClick={() => handleSort('serviceType')}>
                Service Type
                {sortConfig.key === 'serviceType' && (
                  sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                )}
              </div>
              <div className="feedback-header-cell-t sortable-t" onClick={() => handleSort('rating')}>
                Rating
                {sortConfig.key === 'rating' && (
                  sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                )}
              </div>
              <div className="feedback-header-cell-t sortable-t" onClick={() => handleSort('date')}>
                Date Submitted
                {sortConfig.key === 'date' && (
                  sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                )}
              </div>
              <div className="feedback-header-cell-t">
                Status
              </div>
            </div>
            
            {feedbacks.map((feedback) => (
              <div key={feedback._id} className="feedback-item-t">
                <div 
                  className="feedback-row-t" 
                  onClick={() => {
                    toggleExpandFeedback(feedback._id);
                    if (!feedback.adminResponse) {
                      fetchFeedbackResponse(feedback._id);
                    }
                  }}
                >
                  <div className="feedback-cell-t">
                    <span className={`service-badge-t ${feedback.serviceType.toLowerCase()}-t`}>
                      {feedback.serviceType}
                    </span>
                  </div>
                  <div className="feedback-cell-t rating-cell-t">
                    <span className="stars-display-t">{renderStarRating(feedback.rating)}</span>
                    <span className="rating-number-t">({feedback.rating}/5)</span>
                  </div>
                  <div className="feedback-cell-t">
                    {formatDate(feedback.date)}
                  </div>
                  <div className="feedback-cell-t">
                    {feedback.adminResponse ? (
                      <span className="status-responded-t">Response received</span>
                    ) : (
                      <span className="status-pending-t">Awaiting response</span>
                    )}
                  </div>
                  <div className="expand-cell-t">
                    {expandedFeedback === feedback._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
                
                {expandedFeedback === feedback._id && (
                  <div className="feedback-detail-t">
                    <div className="detail-section-t">
                      <h4>Your Comment</h4>
                      <p className="comment-content-t">
                        {feedback.comment || "You didn't provide any additional comments."}
                      </p>
                    </div>
                    
                    <div className="detail-section-t">
                      <h4>Admin Response</h4>
                      {feedback.adminResponse ? (
                        <div className="response-content-t">
                          <p>{feedback.adminResponse}</p>
                        </div>
                      ) : (
                        <div className="no-response-t">
                          <p>No response from admin yet. We'll notify you when we respond.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TouristFeedbackDisplay;