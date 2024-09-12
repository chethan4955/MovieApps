

import React, { useState } from 'react';
import './CancelBooking.css'; // Import the custom CSS
import axios from 'axios';

const CancelBooking = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://localhost:7291/api/Booking/${username}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204) {
        setMessage('Booking canceled successfully.');

        // Send email notification
        const mailData = {
          ToEmail: 'chinna4955@gmail.com',  // Receiver email
          toName: username,                        // Name to display in email
          subject: 'Booking Cancellation Confirmation',
          body: `Dear ${username}, your booking has been successfully canceled.`,
        };

        // Send email request
        await axios.post('https://localhost:7161/api/Mail', mailData);

      } else if (response.status === 404) {
        setMessage('Booking not found.');
      } else {
        setMessage('An error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while trying to cancel the booking.');
    }
  };

  return (
    <div className="cancel-booking-container">
      <div className="card cancel-booking-card">
        <div className="card-body">
          <h2 className="card-title">Please enter the details for cancellations</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleDelete}>
            Cancel Booking
          </button>
          {message && <p className="mt-3 message-text">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CancelBooking;

