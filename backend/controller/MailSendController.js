const express = require('express');
const dotenv = require("dotenv");
const transporter = require('../utils/Mailer');
dotenv.config();

// const sendMail = async (req, res) => {
//     const { email , paymentId , amount} = req.body;
  

//     const subject="Payment Successful!"
//     const text = `
//     Dear Customer,
    
//     Thank you for your payment!
    
//     Here are your payment details:
//     - Payment ID: ${paymentId}
//     - Amount Paid: $${amount}
    
//     Your booking has been successfully confirmed.
    
//     If you have any questions, feel free to contact our support team.
    
//     Best regards,  
//     CeylonGo
//     `;
    
    

//     const mailOptions = {
//       from: process.env.GMAIL_USER,
//       to:email,
//       subject,
//       text,
//     };
  
//     try {
//       const info = await transporter.sendMail(mailOptions);
//       res.status(200).json({ message: 'Email sent' });
//     } catch (error) {
//       console.error('Error sending email:', error);
//       res.status(500).json({ message: 'Error sending email', error: error.message });
//     }
// };

const sendMail = async (req, res) => {
  const { email, paymentId, amount } = req.body;

  const subject = "Payment Successful!";

  // Plain text version (no indentation)
  const text = 
`Dear Customer,

Thank you for your payment!

Here are your payment details:
- Payment ID: ${paymentId}
- Amount Paid: $${amount}

Your booking has been successfully confirmed.

If you have any questions, feel free to contact our support team.

Best regards,  
CeylonGo`;

  // HTML version (for better formatting in email clients)
  const html = `
    <p>Dear Customer,</p>
    <p>Thank you for your payment!</p>
    <p><strong>Here are your payment details:</strong><br>
    Payment ID: <strong>${paymentId}</strong><br>
    Amount Paid: <strong>$${amount}</strong></p>
    <p>Your booking has been successfully confirmed.</p>
    <p>If you have any questions, feel free to contact our support team.</p>
    <p>Best regards,<br><strong>CeylonGo</strong></p>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    text, // fallback for plain-text-only clients
    html  // preferred for better formatting
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
};

  
  module.exports = { sendMail };