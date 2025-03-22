import React, { useState } from 'react';
import './PackagePayment.css';

// Mock data - in a real application, you'd get this from props or context
const mockBookingDetails = {
  tourName: 'Adventure Tour Package',
  duration: '7 days',
  travelers: 2,
  price: 1299.99,
  startDate: '2025-04-15',
};

const Payment = ({ bookingDetails = mockBookingDetails }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiry || !cardDetails.cvv) {
        setError('Please fill in all card details');
        return;
      }

      if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
        setError('Please enter a valid 16-digit card number');
        return;
      }

      if (cardDetails.cvv.length < 3) {
        setError('Please enter a valid CVV');
        return;
      }
    }

    // Process payment
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentComplete(true);
      
      // Create transaction details
      setTransactionDetails({
        transactionId: 'TXN' + Math.floor(Math.random() * 1000000),
        date: new Date().toLocaleString(),
        amount: bookingDetails.price,
        method: paymentMethod
      });
    }, 2000);
  };

  // If payment is complete, show confirmation
  if (isPaymentComplete && transactionDetails) {
    return (
      <div className="payment-container">
        <div className="payment-header">
          <h1>Booking Confirmed!</h1>
          <p>Your payment has been processed successfully</p>
        </div>
        
        <div className="confirmation-content">
          <div className="confirmation-box">
            <div className="confirmation-icon">✅</div>
            <h2>Thank You For Your Booking</h2>
            <p>Transaction ID: {transactionDetails.transactionId}</p>
            <p>Date: {transactionDetails.date}</p>
            <p>Amount Paid: ${transactionDetails.amount.toFixed(2)}</p>
            <p>Payment Method: {transactionDetails.method === 'card' ? 'Credit/Debit Card' : 
                              transactionDetails.method === 'paypal' ? 'PayPal' : 'Bank Transfer'}</p>
            
            <div className="booking-details">
              <h3>Booking Details</h3>
              <p><strong>Tour:</strong> {bookingDetails.tourName}</p>
              <p><strong>Duration:</strong> {bookingDetails.duration}</p>
              <p><strong>Start Date:</strong> {bookingDetails.startDate}</p>
              <p><strong>Travelers:</strong> {bookingDetails.travelers}</p>
            </div>
            
            <button className="return-button" onClick={() => window.location.href = '/'}>
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>Complete Your Booking</h1>
        <p>Please review your booking details and complete the payment</p>
      </div>

      <div className="payment-content">
        <div className="booking-summary">
          <h2>Booking Summary</h2>
          <div className="summary-item">
            <span>Tour Package:</span>
            <span>{bookingDetails.tourName}</span>
          </div>
          <div className="summary-item">
            <span>Duration:</span>
            <span>{bookingDetails.duration}</span>
          </div>
          <div className="summary-item">
            <span>Start Date:</span>
            <span>{bookingDetails.startDate}</span>
          </div>
          <div className="summary-item">
            <span>Number of Travelers:</span>
            <span>{bookingDetails.travelers}</span>
          </div>
          <div className="summary-item total">
            <span>Total Amount:</span>
            <span>${bookingDetails.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="payment-form-container">
          <h2>Payment Method</h2>
          
          <div className="payment-methods">
            <div 
              className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('card')}
            >
              <div className="payment-method-icon">💳</div>
              <span>Credit/Debit Card</span>
            </div>
            <div 
              className={`payment-method ${paymentMethod === 'paypal' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('paypal')}
            >
              <div className="payment-method-icon">🅿️</div>
              <span>PayPal</span>
            </div>
            <div 
              className={`payment-method ${paymentMethod === 'bank' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('bank')}
            >
              <div className="payment-method-icon">🏦</div>
              <span>Bank Transfer</span>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="payment-form">
            {paymentMethod === 'card' && (
              <div className="card-payment">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.cardNumber}
                    onChange={handleInputChange}
                    maxLength="19"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cardName">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={cardDetails.cardName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group half">
                    <label htmlFor="expiry">Expiry Date</label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleInputChange}
                      maxLength="5"
                    />
                  </div>
                  <div className="form-group half">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={handleInputChange}
                      maxLength="4"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="paypal-payment">
                <p>You will be redirected to PayPal to complete your payment.</p>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="bank-payment">
                <p>Please use the following details to make your bank transfer:</p>
                <div className="bank-details">
                  <div><strong>Bank Name:</strong> Global Tours Bank</div>
                  <div><strong>Account Number:</strong> 1234567890</div>
                  <div><strong>Account Name:</strong> Adventure Tours Inc.</div>
                  <div><strong>Reference:</strong> Your booking reference will be provided after submission</div>
                </div>
              </div>
            )}

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>

            <button 
              type="submit" 
              className="pay-button"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay $${bookingDetails.price.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;