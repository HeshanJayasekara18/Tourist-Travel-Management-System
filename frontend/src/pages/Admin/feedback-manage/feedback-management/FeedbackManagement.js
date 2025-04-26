// FeedbackManagement.js
import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Download } from 'lucide-react';
import './FeedbackManagement.css';

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [filters, setFilters] = useState({
    serviceType: '',
    rating: '',
    dateFrom: '',
    dateTo: ''
  });
  
  // Sorting states
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Filter menu state
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Fetch feedback data
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/feedbacks');
        if (!response.ok) {
          throw new Error('Failed to fetch feedbacks');
        }
        const data = await response.json();
        setFeedbacks(data);
        setFilteredFeedbacks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Apply search and filters
  useEffect(() => {
    let result = [...feedbacks];
    
    // Apply search term
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(feedback => 
        feedback.touristID?.toLowerCase().includes(lowercasedSearch) || 
        feedback.comment?.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    // Apply service type filter
    if (filters.serviceType) {
      result = result.filter(feedback => feedback.serviceType === filters.serviceType);
    }
    
    // Apply rating filter
    if (filters.rating) {
      result = result.filter(feedback => feedback.rating === parseInt(filters.rating));
    }
    
    // Apply date range filter
    if (filters.dateFrom && filters.dateTo) {
      const fromDate = new Date(filters.dateFrom);
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999); // Set to end of day
      
      result = result.filter(feedback => {
        const feedbackDate = new Date(feedback.date);
        return feedbackDate >= fromDate && feedbackDate <= toDate;
      });
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredFeedbacks(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, sortConfig, feedbacks]);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFeedbacks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      serviceType: '',
      rating: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  // Toggle sort direction
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Pagination handlers
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Export feedback data as CSV
  const exportToCSV = () => {
    // Headers for CSV
    const headers = ['Tourist ID', 'Service Type', 'Rating', 'Comment', 'Date'];
    
    // Format the data for CSV
    const csvData = filteredFeedbacks.map(feedback => [
      feedback.touristID,
      feedback.serviceType,
      feedback.rating,
      `"${feedback.comment?.replace(/"/g, '""') || ''}"`, // Handle quotes in comments
      new Date(feedback.date).toLocaleDateString()
    ]);
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `feedback_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
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

  if (isLoading) {
    return <div className="loading-container-r">Loading feedback data...</div>;
  }

  if (error) {
    return <div className="error-container-r">Error: {error}</div>;
  }

  return (
    <div className="feedback-management-container-r">
      <div className="feedback-header-r">
        <h1 className="feedback-title-r">Feedback Management</h1>
        <div className="feedback-tools-r">
          <div className="search-container-r">
            <Search size={18} className="search-icon-r" />
            <input
              type="text"
              className="search-input-r"
              placeholder="Search by tourist ID or comment..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <button 
            className="filter-toggle-button-r" 
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          >
            <Filter size={18} />
            <span>Filters</span>
            {isFilterMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          <button className="export-button-r" onClick={exportToCSV}>
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>
      
      {isFilterMenuOpen && (
        <div className="filter-panel-r">
          <div className="filter-row-r">
            <div className="filter-field-r">
              <label htmlFor="serviceType">Service Type</label>
              <select 
                id="serviceType" 
                name="serviceType" 
                value={filters.serviceType} 
                onChange={handleFilterChange}
              >
                <option value="">All Services</option>
                <option value="TourGuide">Tour Guide</option>
                <option value="HotelRoom">Hotel Room</option>
                <option value="Vehicle">Vehicle</option>
              </select>
            </div>
            
            <div className="filter-field-r">
              <label htmlFor="rating">Rating</label>
              <select 
                id="rating" 
                name="rating" 
                value={filters.rating} 
                onChange={handleFilterChange}
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            
            <div className="filter-field-r">
              <label htmlFor="dateFrom">Date From</label>
              <input 
                type="date" 
                id="dateFrom" 
                name="dateFrom" 
                value={filters.dateFrom} 
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-field-r">
              <label htmlFor="dateTo">Date To</label>
              <input 
                type="date" 
                id="dateTo" 
                name="dateTo" 
                value={filters.dateTo} 
                onChange={handleFilterChange}
              />
            </div>
            
            <button className="clear-filters-button-r" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      )}
      
      <div className="feedback-stats-r">
        <div className="stat-box-r">
          <span className="stat-label-r">Total Feedbacks</span>
          <span className="stat-value-r">{filteredFeedbacks.length}</span>
        </div>
        <div className="stat-box-r">
          <span className="stat-label-r">Average Rating</span>
          <span className="stat-value-r">
            {filteredFeedbacks.length > 0 
              ? (filteredFeedbacks.reduce((sum, item) => sum + item.rating, 0) / filteredFeedbacks.length).toFixed(1)
              : 'N/A'}
          </span>
        </div>
      </div>
      
      <div className="feedback-table-container-r">
        <table className="feedback-table-r">
          <thead>
            <tr>
              <th onClick={() => handleSort('touristID')} className="sortable-header-r">
                Tourist ID
                {sortConfig.key === 'touristID' && (
                  sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                )}
              </th>
              <th onClick={() => handleSort('serviceType')} className="sortable-header-r">
                Service Type
                {sortConfig.key === 'serviceType' && (
                  sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                )}
              </th>
              <th onClick={() => handleSort('rating')} className="sortable-header-r">
                Rating
                {sortConfig.key === 'rating' && (
                  sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                )}
              </th>
              <th>Comment</th>
              <th onClick={() => handleSort('date')} className="sortable-header-r">
                Date
                {sortConfig.key === 'date' && (
                  sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((feedback, index) => (
                <tr key={index}>
                  <td>{feedback.touristID}</td>
                  <td>
                    <span className={`service-badge-r ${feedback.serviceType.toLowerCase()}-r`}>
                      {feedback.serviceType}
                    </span>
                  </td>
                  <td className="rating-cell-r">
                    <span className="stars-display-r">{renderStarRating(feedback.rating)}</span>
                  </td>
                  <td className="comment-cell-r">
                    {feedback.comment || <span className="no-comment-r">No comment provided</span>}
                  </td>
                  <td>{formatDate(feedback.date)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-results-r">
                  No feedback found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {filteredFeedbacks.length > 0 && (
        <div className="pagination-r">
          <button 
            className="pagination-button-r" 
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Previous
          </button>
          <div className="page-numbers-r">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              // Show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={i}
                  className={`page-number-r ${currentPage === pageNum ? 'active-page-r' : ''}`}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="ellipsis-r">...</span>
                <button
                  className="page-number-r"
                  onClick={() => goToPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          <button 
            className="pagination-button-r" 
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackManagement;