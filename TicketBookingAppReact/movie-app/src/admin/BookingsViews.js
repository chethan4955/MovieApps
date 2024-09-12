


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingsView.css'; // Import CSS for styling

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://localhost:7291/api/Booking');
        setBookings(response.data);
      } catch (err) {
        setError('Error fetching bookings');
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!bookings.length) {
    return <p>Loading...</p>;
  }

  return (
    <div id="bookings-containers">
      <h1>All Bookings</h1>
      <div id="bookings-lists">
        {bookings.map((booking) => (
          <div key={booking.id} id="booking-cards">
            <h2>Movie: {booking.movieId}</h2>
            <p><strong>Username:</strong> {booking.username}</p>
            <p><strong>Showtime:</strong> {new Date(booking.showtime).toLocaleString()}</p>
            <p><strong>Number of Tickets:</strong> {booking.numberOfTickets}</p>
            <p><strong>Price per Ticket:</strong> ₹{booking.priceOfTicket}</p>
            
            {/* Calculate and display the total price */}
            <p><strong>Total Price:</strong> ₹{booking.numberOfTickets * booking.priceOfTicket}</p>

            <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>

            {/* Display the status as a red button */}
            <p>
              <strong>Status:</strong>
              <button className="status-btn" color='red'>{booking.status}</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;