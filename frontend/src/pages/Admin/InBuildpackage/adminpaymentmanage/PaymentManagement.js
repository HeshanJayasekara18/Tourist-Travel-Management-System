import React, { useState, useEffect } from 'react';
import './PaymentManagement.css';
import { 
  FiSearch, 
  FiEye, 
  FiFileText, 
  FiMail, 
  FiRefreshCw, 
  FiX, 
  FiDollarSign, 
  FiCalendar, 
  FiCreditCard, 
  FiUser, 
  FiPackage,
  FiCheckCircle,
  FiAlertCircle,
  FiClock
} from 'react-icons/fi';

const PaymentManagement = () => {
  // State for payments data
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock payment data - in a real application, you'd fetch this from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockPayments = [
        {
          id: 'PAY001',
          bookingId: 'BK7825',
          customerName: 'John Smith',
          tourPackage: 'Adventure Tour Package',
          amount: 1299.99,
          date: '2025-03-18',
          status: 'completed',
          paymentMethod: 'card',
          transactionId: 'TXN482751'
        },
        {
          id: 'PAY002',
          bookingId: 'BK7830',
          customerName: 'Emma Johnson',
          tourPackage: 'Beach Getaway',
          amount: 899.50,
          date: '2025-03-17',
          status: 'completed',
          paymentMethod: 'paypal',
          transactionId: 'TXN482752'
        },
        {
          id: 'PAY003',
          bookingId: 'BK7835',
          customerName: 'Michael Brown',
          tourPackage: 'Cultural Heritage Tour',
          amount: 1599.99,
          date: '2025-03-19',
          status: 'pending',
          paymentMethod: 'bank',
          transactionId: 'TXN482753'
        },
        {
          id: 'PAY004',
          bookingId: 'BK7840',
          customerName: 'Sarah Wilson',
          tourPackage: 'Mountain Trek',
          amount: 1099.99,
          date: '2025-03-16',
          status: 'completed',
          paymentMethod: 'card',
          transactionId: 'TXN482754'
        },
        {
          id: 'PAY005',
          bookingId: 'BK7845',
          customerName: 'David Lee',
          tourPackage: 'Island Hopping',
          amount: 1799.99,
          date: '2025-03-15',
          status: 'failed',
          paymentMethod: 'card',
          transactionId: 'TXN482755'
        },
        {
          id: 'PAY006',
          bookingId: 'BK7850',
          customerName: 'Lisa Taylor',
          tourPackage: 'City Explorer',
          amount: 799.99,
          date: '2025-03-20',
          status: 'pending',
          paymentMethod: 'paypal',
          transactionId: 'TXN482756'
        },
      ];
      
      setPayments(mockPayments);
      setFilteredPayments(mockPayments);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter payments based on search term and status
  useEffect(() => {
    let result = payments;
    
    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(payment => payment.status === filterStatus);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(payment => 
        payment.id.toLowerCase().includes(term) ||
        payment.bookingId.toLowerCase().includes(term) ||
        payment.customerName.toLowerCase().includes(term) ||
        payment.tourPackage.toLowerCase().includes(term) ||
        payment.transactionId.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    result = [...result].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredPayments(result);
  }, [payments, searchTerm, sortConfig, filterStatus]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // View payment details
  const viewPaymentDetails = (payment) => {
    setSelectedPayment(payment);
    setShowDetailsModal(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-badge-success';
      case 'pending':
        return 'status-badge-warning';
      case 'failed':
        return 'status-badge-danger';
      default:
        return 'status-badge-default';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="status-icon" />;
      case 'pending':
        return <FiClock className="status-icon" />;
      case 'failed':
        return <FiAlertCircle className="status-icon" />;
      default:
        return null;
    }
  };

  // Generate payment receipt
  const generateReceipt = (payment) => {
    alert(`Receipt for ${payment.id} will be generated and downloaded.`);
    // In a real application, this would generate a PDF receipt and trigger download
  };

  return (
    <div className="payment-management-container">
      <h1><FiDollarSign className="header-icon" /> Payment Management</h1>
      
      <div className="payment-management-header">
        <div className="search-filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">
              <FiSearch className="search-icon" />
            </button>
          </div>
          
          <div className="filter-container">
            <label><FiAlertCircle className="filter-icon" /> Filter Status:</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Payments</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
        
        <div className="payment-summary">
          <div className="summary-box">
            <h3><FiDollarSign className="summary-icon" /> Total Payments</h3>
            <p>{payments.length}</p>
          </div>
          <div className="summary-box success">
            <h3><FiCheckCircle className="summary-icon" /> Completed</h3>
            <p>{payments.filter(p => p.status === 'completed').length}</p>
          </div>
          <div className="summary-box warning">
            <h3><FiClock className="summary-icon" /> Pending</h3>
            <p>{payments.filter(p => p.status === 'pending').length}</p>
          </div>
          <div className="summary-box danger">
            <h3><FiAlertCircle className="summary-icon" /> Failed</h3>
            <p>{payments.filter(p => p.status === 'failed').length}</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading payment data...</p>
        </div>
      ) : (
        <div className="payment-table-container">
          <table className="payment-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('id')}>
                  Payment ID {sortConfig.key === 'id' && (
                    sortConfig.direction === 'asc' ? '↑' : '↓'
                  )}
                </th>
                <th onClick={() => requestSort('bookingId')}>
                  Booking ID {sortConfig.key === 'bookingId' && (
                    sortConfig.direction === 'asc' ? '↑' : '↓'
                  )}
                </th>
                <th onClick={() => requestSort('customerName')}>
                  <FiUser className="header-icon" /> Customer {sortConfig.key === 'customerName' && (
                    sortConfig.direction === 'asc' ? '↑' : '↓'
                  )}
                </th>
                <th onClick={() => requestSort('tourPackage')}>
                  <FiPackage className="header-icon" /> Tour Package {sortConfig.key === 'tourPackage' && (
                    sortConfig.direction === 'asc' ? '↑' : '↓'
                  )}
                </th>
                <th onClick={() => requestSort('amount')}>
                  <FiDollarSign className="header-icon" /> Amount {sortConfig.key === 'amount' && (
                    sortConfig.direction === 'asc' ? '↑' : '↓'
                  )}
                </th>
                <th onClick={() => requestSort('date')}>
                  <FiCalendar className="header-icon" /> Date {sortConfig.key === 'date' && (
                    sortConfig.direction === 'asc' ? '↑' : '↓'
                  )}
                </th>
                <th onClick={() => requestSort('status')}>
                  Status {sortConfig.key === 'status' && (
                    sortConfig.direction === 'asc' ? '↑' : '↓'
                  )}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map(payment => (
                  <tr key={payment.id} className={`payment-row status-${payment.status}`}>
                    <td>{payment.id}</td>
                    <td>{payment.bookingId}</td>
                    <td>{payment.customerName}</td>
                    <td>{payment.tourPackage}</td>
                    <td>${payment.amount.toFixed(2)}</td>
                    <td>{formatDate(payment.date)}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="action-button view"
                        onClick={() => viewPaymentDetails(payment)}
                        title="View Details"
                      >
                        <FiEye className="action-icon" />
                      </button>
                      {payment.status === 'completed' && (
                        <button 
                          className="action-button receipt"
                          onClick={() => generateReceipt(payment)}
                          title="Generate Receipt"
                        >
                          <FiFileText className="action-icon" />
                        </button>
                      )}
                      {payment.status === 'pending' && (
                        <button 
                          className="action-button remind"
                          title="Send Reminder"
                        >
                          <FiMail className="action-icon" />
                        </button>
                      )}
                      {payment.status === 'failed' && (
                        <button 
                          className="action-button retry"
                          title="Retry Payment"
                        >
                          <FiRefreshCw className="action-icon" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">No payments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment Details Modal */}
      {showDetailsModal && selectedPayment && (
        <div className="modal-overlay">
          <div className="payment-details-modal">
            <div className="modal-header">
              <h2><FiDollarSign className="modal-header-icon" /> Payment Details</h2>
              <button className="close-button" onClick={() => setShowDetailsModal(false)}>
                <FiX className="close-icon" />
              </button>
            </div>
            <div className="modal-content">
              <div className="detail-row">
                <div className="detail-label">Payment ID:</div>
                <div className="detail-value">{selectedPayment.id}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Booking ID:</div>
                <div className="detail-value">{selectedPayment.bookingId}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Transaction ID:</div>
                <div className="detail-value">{selectedPayment.transactionId}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label"><FiUser className="detail-icon" /> Customer Name:</div>
                <div className="detail-value">{selectedPayment.customerName}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label"><FiPackage className="detail-icon" /> Tour Package:</div>
                <div className="detail-value">{selectedPayment.tourPackage}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label"><FiDollarSign className="detail-icon" /> Amount:</div>
                <div className="detail-value">${selectedPayment.amount.toFixed(2)}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label"><FiCalendar className="detail-icon" /> Date:</div>
                <div className="detail-value">{formatDate(selectedPayment.date)}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Status:</div>
                <div className="detail-value">
                  <span className={`status-badge ${getStatusBadgeClass(selectedPayment.status)}`}>
                    {getStatusIcon(selectedPayment.status)}
                    {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-label"><FiCreditCard className="detail-icon" /> Payment Method:</div>
                <div className="detail-value">
                  {selectedPayment.paymentMethod === 'card' ? 'Credit/Debit Card' : 
                   selectedPayment.paymentMethod === 'paypal' ? 'PayPal' : 'Bank Transfer'}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {selectedPayment.status === 'completed' && (
                <button 
                  className="modal-button"
                  onClick={() => generateReceipt(selectedPayment)}
                >
                  <FiFileText className="button-icon" /> Generate Receipt
                </button>
              )}
              {selectedPayment.status === 'pending' && (
                <button className="modal-button">
                  <FiMail className="button-icon" /> Send Reminder
                </button>
              )}
              {selectedPayment.status === 'failed' && (
                <button className="modal-button">
                  <FiRefreshCw className="button-icon" /> Retry Payment
                </button>
              )}
              <button 
                className="modal-button secondary"
                onClick={() => setShowDetailsModal(false)}
              >
                <FiX className="button-icon" /> Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;