// UserManagement.js
import React, { useState, useEffect } from 'react';
import './AdminUserManagement.css';
import { Search, Filter, Trash2, Edit, User, Mail, Calendar, CreditCard, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [activeFilters, setActiveFilters] = useState(false);
  const [filterMonth, setFilterMonth] = useState('');
  
  // Mock data - in a real app, you would fetch this from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockUsers = [
        { id: 'U001', fullName: 'John Doe', email: 'john@gmail.com', startFrom: '2023-01-15', nic: '654654654648777' },
        { id: 'U002', fullName: 'Jane Smith', email: 'jane@gmail.com', startFrom: '2023-02-20', nic: '876876887889889' },
        { id: 'U003', fullName: 'Robert Johnson', email: 'robert@gmail.com', startFrom: '2023-03-10', nic: '876876868776558' },
        { id: 'U004', fullName: 'Sarah Williams', email: 'sarah@gmail.com', startFrom: '2023-04-05', nic: '657576575765765' },
        { id: 'U005', fullName: 'Michael Brown', email: 'michael@gmail.com', startFrom: '2023-05-15', nic: '657576575765984' },
        { id: 'U006', fullName: 'Emily Davis', email: 'emily@gmail.com', startFrom: '2023-06-20', nic: '657576575732165' },
        { id: 'U007', fullName: 'David Wilson', email: 'david@gmail.com', startFrom: '2023-07-10', nic: '657576575798765' },
        { id: 'U008', fullName: 'Lisa Taylor', email: 'lisa@gmail.com', startFrom: '2023-08-05', nic: '657576575765123' },
      ];
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle user deletion
  const handleDelete = (userId) => {
    setUserToDelete(userId);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(user => user.id !== userToDelete));
    setShowConfirmModal(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setUserToDelete(null);
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted users
  const getSortedUsers = () => {
    const sortedUsers = [...filteredUsers];
    if (sortConfig.key) {
      sortedUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedUsers;
  };

  const toggleFilters = () => {
    setActiveFilters(!activeFilters);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Extract month from date for filtering
  const getMonthFromDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long' });
  };

  // Get all available months for filter
  const availableMonths = [...new Set(users.map(user => getMonthFromDate(user.startFrom)))];

  // Filter users based on search term and filter settings
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nic.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMonthFilter = filterMonth === '' || getMonthFromDate(user.startFrom) === filterMonth;
    
    return matchesSearch && matchesMonthFilter;
  });

  return (
    <div className="user-management-container">
      <div className="user-manage-content">
        <h1 className="page-title">User Management</h1>
        
        <div className="search-section">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">
              <Search size={18} />
            </button>
          </div>
          <button 
            className={`filter-btn ${activeFilters ? 'active' : ''}`}
            onClick={toggleFilters}
          >
            <Filter size={18} />
          </button>
        </div>
        
        {activeFilters && (
          <div className="filters-container">
            <div className="filter-group">
              <label>Start Month:</label>
              <select 
                value={filterMonth} 
                onChange={(e) => setFilterMonth(e.target.value)}
                className="filter-select"
              >
                <option value="">All Months</option>
                {availableMonths.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading user data...</p>
          </div>
        ) : (
          <div className="user-table-container">
            <div className="table-stats">
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <table className="user-table">
              <thead>
                <tr>
                  <th onClick={() => requestSort('id')} className="sortable-header">
                    <div className="header-content">
                      <span>User ID</span>
                      {sortConfig.key === 'id' && (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th onClick={() => requestSort('fullName')} className="sortable-header">
                    <div className="header-content">
                      <span>Full Name</span>
                      {sortConfig.key === 'fullName' && (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th onClick={() => requestSort('email')} className="sortable-header">
                    <div className="header-content">
                      <span>E-mail Address</span>
                      {sortConfig.key === 'email' && (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th onClick={() => requestSort('startFrom')} className="sortable-header">
                    <div className="header-content">
                      <span>Start From</span>
                      {sortConfig.key === 'startFrom' && (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th onClick={() => requestSort('nic')} className="sortable-header">
                    <div className="header-content">
                      <span>NIC</span>
                      {sortConfig.key === 'nic' && (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {getSortedUsers().length > 0 ? (
                  getSortedUsers().map((user, index) => (
                    <tr key={index} className="user-row">
                      <td>
                        <div className="cell-with-icon">
                          <User size={16} className="cell-icon" />
                          {user.id}
                        </div>
                      </td>
                      <td>{user.fullName}</td>
                      <td>
                        <div className="cell-with-icon">
                          <Mail size={16} className="cell-icon" />
                          {user.email}
                        </div>
                      </td>
                      <td>
                        <div className="cell-with-icon">
                          <Calendar size={16} className="cell-icon" />
                          {formatDate(user.startFrom)}
                        </div>
                      </td>
                      <td>
                        <div className="cell-with-icon">
                          <CreditCard size={16} className="cell-icon" />
                          {user.nic}
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="edit-btn">
                            <Edit size={16} />
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDelete(user.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-results">
                      <div className="no-results-content">
                        <AlertCircle size={24} />
                        <p>No users found matching your search criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <div className="modal-header">
              <AlertCircle size={24} className="warning-icon" />
              <h3>Confirm Deletion</h3>
            </div>
            <p>Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
              <button className="confirm-btn" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;