


// import React, { useState } from 'react';
// import axios from 'axios';
// import { QRCodeSVG } from 'qrcode.react'; // Import QRCode component
// import './BookingDetails.css'; // Import the CSS file
// import { Link } from 'react-router-dom';

// const BookingDetails = () => {
//     const [bookingDetails, setBookingDetails] = useState([]);
//     const [error, setError] = useState(null);
//     const username = encodeURIComponent(localStorage.getItem('username'));
//     const handleGetBookingDetails = async () => {
//         const username = localStorage.getItem('username');
//         if (!username) {
//             console.error('Username not found in local storage');
//             setError('Username not found in local storage');
//             return;
//         }

//         try {
//             const response = await axios.get(`https://localhost:7291/api/Booking/username/${username}`);
//             setBookingDetails(response.data);
//             setError(null); // Clear any previous errors
//         } catch (error) {
//             console.error('Error fetching booking details:', error.response|| error.message);
//             setError('Failed to fetch booking details');
//         }
//     };
    
//     const handleEdit = (bookingId) => {
//         // Logic for handling booking edit, redirect to an edit form or open a modal
//         console.log('Editing booking with ID:', bookingId);
//     };

//     const handleDelete = async (bookingId) => {
//         try {
//             await axios.delete(`https://localhost:7291/api/Booking/${bookingId}`);
//             // Filter out the deleted booking from the state
//             setBookingDetails(bookingDetails.filter(booking => booking.userId !== bookingId));
//         } catch (error) {
//             console.error('Error deleting booking:', error);
//             setError('Failed to delete booking');
//         }
//     };

//     return (
//         <div id="booking-container">
//             <button id="get-booking-btn" onClick={handleGetBookingDetails}>
//                 Get My Booking Details
//             </button>

//             {error && <p className="error-message">{error}</p>}

//             {bookingDetails.length > 0 ? (
//                 <div id="booking-details-container">
//                     <h3 id="booking-header">Booking Details</h3>
//                     <div id="booking-cards">
//                         {bookingDetails.map((booking, index) => (
//                             <div key={index} className="booking-card">
//                                 <div className="booking-content">
//                                     <div className="booking-detail">
//                                         <label className="booking-label">User ID:</label>
//                                         <p className="booking-info">{booking.userId}</p>
//                                     </div>
//                                     <div className="booking-detail">
//                                         <label className="booking-label">Movie ID:</label>
//                                         <p className="booking-info">{booking.movieId}</p>
//                                     </div>
//                                     <div className="booking-detail">
//                                         <label className="booking-label">Username:</label>
//                                         <p className="booking-info">{booking.username}</p>
//                                     </div>
//                                     <div className="booking-detail">
//                                         <label className="booking-label">Showtime:</label>
//                                         <p className="booking-info">{booking.showtime}</p>
//                                     </div>
//                                     <div className="booking-detail">
//                                         <label className="booking-label">Number of Tickets:</label>
//                                         <p className="booking-info">{booking.numberOfTickets}</p>
//                                     </div>
//                                     <div className="booking-detail">
//                                         <label className="booking-label">Price per Ticket:</label>
//                                         <p className="booking-info">${booking.priceOfTicket}</p>
//                                     </div>

//                                     {/* Calculate and display the total price */}
//                                     <div className="booking-detail">
//                                         <label className="booking-label">Total Price:</label>
//                                         <p className="booking-info">
//                                             ${booking.numberOfTickets * booking.priceOfTicket}
//                                         </p>
//                                     </div>

//                                     <div className="booking-detail">
//                                         <label className="booking-label">Status:</label>
//                                         <p className="booking-info">{booking.status}</p>
//                                     </div>
//                                 </div>

//                                 <div className="booking-actions">
//                                     <Link to="/EditBookingDetails">
//                                         <button className="edit-btn" onClick={() => handleEdit(booking.userId)}>
//                                             Edit
//                                         </button>
//                                     </Link>
//                                     <Link to="/CancelBooking">
//                                         <button className="delete-btn" onClick={() => handleDelete(booking.userId)}>
//                                             Delete
//                                         </button>
//                                     </Link>
//                                 </div>

//                                 <div className="booking-qr">
//                                     <QRCodeSVG value={`BookingID:${booking.userId}-${booking.movieId}`} />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 <p>No booking details found</p>
//             )}
//         </div>
//     );
// };

// export default BookingDetails;





import React, { useState } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react'; // Import QRCode component
import './BookingDetails.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const BookingDetails = () => {
    const [bookingDetails, setBookingDetails] = useState([]);
    const [error, setError] = useState(null);
    const username = encodeURIComponent(localStorage.getItem('username'));

    const handleGetBookingDetails = async () => {
        const username = localStorage.getItem('username');
        if (!username) {
            console.error('Username not found in local storage');
            setError('Username not found in local storage');
            return;
        }

        try {
            const response = await axios.get(`https://localhost:7291/api/Booking/username/${username}`);
            setBookingDetails(response.data);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching booking details:', error.response || error.message);
            setError('Failed to fetch booking details');
        }
    };

    const handleEdit = (bookingId) => {
        // Logic for handling booking edit, redirect to an edit form or open a modal
        console.log('Editing booking with ID:', bookingId);
    };

    const handleDelete = async (bookingId) => {
        try {
            await axios.delete(`https://localhost:7291/api/Booking/${bookingId}`);
            // Filter out the deleted booking from the state
            setBookingDetails(bookingDetails.filter(booking => booking.userId !== bookingId));
        } catch (error) {
            console.error('Error deleting booking:', error);
            setError('Failed to delete booking');
        }
    };

    return (
        <div id="booking-container">
            <button id="get-booking-btn" onClick={handleGetBookingDetails}>
                Get My Booking Details
            </button>

            {error && <p className="error-message">{error}</p>}

            {bookingDetails.length > 0 ? (
                <div id="booking-details-container">
                    <h3 id="booking-header">Booking Details</h3>
                    <div id="booking-cards">
                        {bookingDetails.map((booking, index) => (
                            <div key={index} className="booking-card">
                                <div className="booking-content">
                                    <div className="booking-detail">
                                        <label className="booking-label">User ID:</label>
                                        <p className="booking-info">{booking.userId}</p>
                                    </div>
                                    <div className="booking-detail">
                                        <label className="booking-label">Movie ID:</label>
                                        <p className="booking-info">{booking.movieId}</p>
                                    </div>
                                    <div className="booking-detail">
                                        <label className="booking-label">Username:</label>
                                        <p className="booking-info">{booking.username}</p>
                                    </div>
                                    <div className="booking-detail">
                                        <label className="booking-label">Showtime:</label>
                                        <p className="booking-info">{booking.showtime}</p>
                                    </div>
                                    <div className="booking-detail">
                                        <label className="booking-label">Number of Tickets:</label>
                                        <p className="booking-info">{booking.numberOfTickets}</p>
                                    </div>
                                    <div className="booking-detail">
                                        <label className="booking-label">Price per Ticket:</label>
                                        <p className="booking-info">₹{booking.priceOfTicket}</p>
                                    </div>

                                    {/* Calculate and display the total price */}
                                    <div className="booking-detail">
                                        <label className="booking-label">Total Price:</label>
                                        <p className="booking-info">
                                            ₹{booking.numberOfTickets * booking.priceOfTicket}
                                        </p>
                                    </div>

                                    <div className="booking-detail">
                                        <label className="booking-label">Status:</label>
                                        <p className="booking-info">{booking.status}</p>
                                    </div>
                                </div>

                                <div className="booking-actions">
                                    <Link to="/EditBookingDetails">
                                        <button className="edit-btn" onClick={() => handleEdit(booking.userId)}>
                                            Edit
                                        </button>
                                    </Link>
                                    <Link to="/CancelBooking">
                                        <button className="delete-btn" onClick={() => handleDelete(booking.userId)}>
                                            Cancel
                                        </button>
                                    </Link>
                                </div>

                                <div className="booking-qr">
                                    <QRCodeSVG value={`BookingID:${booking.userId}-${booking.movieId}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No booking details found</p>
            )}
        </div>
    );
};

export default BookingDetails;
