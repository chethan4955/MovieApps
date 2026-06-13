

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams, useNavigate } from 'react-router-dom';

// // const BookingForm = () => {
// //   const { movieId } = useParams(); // Get movieId from the URL
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     showtime: '',
// //     numberOfTickets: 0,
// //     priceOfTicket: 0,
// //   });
// //   const [totalPrice, setTotalPrice] = useState(0); // State for total price
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [errorMessage, setErrorMessage] = useState('');

// //   const showtimes = [
// //     '2024-09-10T14:00',
// //     '2024-09-10T17:00',
// //     '2024-09-10T20:00',
// //     '2024-09-11T14:00',
// //     '2024-09-11T17:00',
// //     '2024-09-11T20:00',
// //   ];

// //   const ticketPrices = [100, 300, 500]; // Example prices for tickets

// //   // Calculate total price based on number of tickets and price per ticket
// //   useEffect(() => {
// //     const calculatedPrice = formData.numberOfTickets * formData.priceOfTicket;
// //     setTotalPrice(calculatedPrice);
// //   }, [formData.numberOfTickets, formData.priceOfTicket]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const token = localStorage.getItem('token'); // Assume a token is required
// //     const bookingData = {
// //       ...formData,
// //       movieId: parseInt(movieId), // Include movieId in the request
// //     };

// //     try {
// //       // Post booking data
// //       const response = await axios.post('https://localhost:7291/api/Booking', bookingData, {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json',
// //         },
// //       });

// //       // Email notification data
// //       const mail = {
// //         ToEmail: 'chinna4955@gmail.com',
// //         toName: formData.username,
// //         subject: " Sucess Booking conformation",
// //         body: `Thanks for booking, ${formData.username}. Your booking details are as follows:\n\nShowtime: ${formData.showtime}\nNumber of Tickets: ${formData.numberOfTickets}\nTotal Price: $${totalPrice}`
// //       };

// //       // Post email data
// //       await axios.post("https://localhost:7161/api/Mail", mail);

// //       setSuccessMessage('Tickets booked successfully and email sent!');
// //       setTimeout(() => {
// //         navigate('/BookingDetails'); // Redirect after a successful booking
// //       }, 2000);
// //     } catch (error) {
// //       setErrorMessage('Error creating booking. Please try again.');
// //       console.error('Error creating booking:', error);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
// //       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
// //       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
// //       <div style={{ marginBottom: '15px' }}>
// //         <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
// //         <input type="text" name="username" value={formData.username} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
// //       </div>

// //       <div style={{ marginBottom: '15px' }}>
// //         <label style={{ display: 'block', marginBottom: '5px' }}>Showtime:</label>
// //         <select name="showtime" value={formData.showtime} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
// //           <option value="">Select a showtime</option>
// //           {showtimes.map((time) => (
// //             <option key={time} value={time}>{new Date(time).toLocaleString()}</option>
// //           ))}
// //         </select>
// //       </div>

// //       <div style={{ marginBottom: '15px' }}>
// //         <label style={{ display: 'block', marginBottom: '5px' }}>Number of Tickets:</label>
// //         <input type="number" name="numberOfTickets" value={formData.numberOfTickets} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
// //       </div>

// //       <div style={{ marginBottom: '15px' }}>
// //         <label style={{ display: 'block', marginBottom: '5px' }}>Price per Ticket:</label>
// //         <select name="priceOfTicket" value={formData.priceOfTicket} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
// //           <option value="">Select a ticket price</option>
// //           {ticketPrices.map((price) => (
// //             <option key={price} value={price}>${price}</option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* Display the total price */}
// //       <div style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>
// //         <label>Total Price: ${totalPrice}</label>
// //       </div>

// //       <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s ease' }}>
// //         Book Tickets
// //       </button>
// //     </form>
// //   );
// // };

// // export default BookingForm;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import SeatSelector from './SeatSelector';

// const BookingForm = () => {
//   const { movieId } = useParams(); // Get movieId from the URL
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     showtime: '',
//     numberOfTickets: 0,
//     priceOfTicket: 0,
//   });
//   const [totalPrice, setTotalPrice] = useState(0); // State for total price
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const showtimes = [
//     '2024-09-10T14:00',
//     '2024-09-10T17:00',
//     '2024-09-10T20:00',
//     '2024-09-11T14:00',
//     '2024-09-11T17:00',
//     '2024-09-11T20:00',
//   ];

//   const ticketPrices = [
//     { value: 100, label: 'Silver' },
//     { value: 300, label: 'Gold' },
//     { value: 500, label: 'Platinum' }
//   ]; // Updated with labels

//   // Calculate total price based on number of tickets and price per ticket
//   useEffect(() => {
//     const calculatedPrice = formData.numberOfTickets * formData.priceOfTicket;
//     setTotalPrice(calculatedPrice);
//   }, [formData.numberOfTickets, formData.priceOfTicket]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token'); // Assume a token is required
//     const bookingData = {
//       ...formData,
//       movieId: parseInt(movieId), // Include movieId in the request
//     };

//     try {
//       // Post booking data
//       const response = await axios.post('https://localhost:7291/api/Booking', bookingData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       // Email notification data
//       const mail = {
//         ToEmail: 'chinna4955@gmail.com',
//         toName: formData.username,
//         subject: "Booking Confirmation",
//         body: `Thanks for booking, ${formData.username}. Your booking details are as follows:\n\nShowtime: ${formData.showtime}\nNumber of Tickets: ${formData.numberOfTickets}\nTotal Price: ₹${totalPrice}`
//       };

//       // Post email data
//       await axios.post("https://localhost:7161/api/Mail", mail);

//       setSuccessMessage('Tickets booked successfully and email sent!');
//       setTimeout(() => {
//         navigate('/BookingDetails'); // Redirect after a successful booking
//       }, 2000);
//     } catch (error) {
//       setErrorMessage('Error creating booking. Please try again.');
//       console.error('Error creating booking:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
//       <div style={{ marginBottom: '15px' }}>
//         <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
//         <input type="text" name="username" value={formData.username} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
//       </div>

//       <div style={{ marginBottom: '15px' }}>
//         <label style={{ display: 'block', marginBottom: '5px' }}>Showtime:</label>
//         <select name="showtime" value={formData.showtime} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
//           <option value="">Select a showtime</option>
//           {showtimes.map((time) => (
//             <option key={time} value={time}>{new Date(time).toLocaleString()}</option>
//           ))}
//         </select>
//       </div>

//       <div style={{ marginBottom: '15px' }}>
//         <label style={{ display: 'block', marginBottom: '5px' }}>Number of Tickets:</label>
//         <input type="number" name="numberOfTickets" value={formData.numberOfTickets} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
//       </div>

//       <div style={{ marginBottom: '15px' }}>
//         <label style={{ display: 'block', marginBottom: '5px' }}>Price per Ticket:</label>
//         <select name="priceOfTicket" value={formData.priceOfTicket} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
//           <option value="">Select a ticket price</option>
//           {ticketPrices.map((price) => (
//             <option key={price.value} value={price.value}>{price.label} - ₹{price.value}</option>
//           ))}
//         </select>
//       </div>

//       {/* Display the total price */}
//       <div style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>
//         <label>Total Price: ₹{totalPrice}</label>
//       </div>

//       <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s ease' }}>
//         Book Tickets
//       </button>
//     </form>
//   );
// };

// export default BookingForm;


import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SeatSelector from './SeatSelector';
import './BookingForm.css';

const SHOWTIMES = [
  '2024-09-10T14:00',
  '2024-09-10T17:00',
  '2024-09-10T20:00',
  '2024-09-11T14:00',
  '2024-09-11T17:00',
  '2024-09-11T20:00',
];

const BookingForm = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = Details, 2 = Seats, 3 = Confirm
  const [formData, setFormData] = useState({ username: '', showtime: '' });
  const [seatSelection, setSeatSelection] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Called by SeatSelector when user clicks "Confirm X seats"
  const handleSeatConfirm = (selection) => {
    setSeatSelection(selection);
    setStep(3);
  };

  const handleSubmit = async () => {
    if (!seatSelection) return;
    setLoading(true);
    setErrorMessage('');

    const token = localStorage.getItem('token');
    const bookingData = {
      username: formData.username,
      showtime: formData.showtime,
      numberOfTickets: seatSelection.numberOfTickets,
      priceOfTicket: seatSelection.priceOfTicket,
      movieId: parseInt(movieId),
      selectedSeats: seatSelection.selectedSeats,
    };

    try {
      await axios.post('https://localhost:7291/api/Booking', bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const mail = {
        ToEmail: 'chinna4955@gmail.com',
        toName: formData.username,
        subject: 'Booking Confirmation',
        body: `Thanks for booking, ${formData.username}!\n\nShowtime: ${new Date(formData.showtime).toLocaleString()}\nSeats: ${seatSelection.selectedSeats.join(', ')}\nCategory: ${seatSelection.category}\nTotal: Rs.${seatSelection.totalPrice}`,
      };

      await axios.post('https://localhost:7161/api/Mail', mail);

      setSuccessMessage('Booking confirmed! Redirecting...');
      setTimeout(() => navigate('/BookingDetails'), 2000);
    } catch (error) {
      setErrorMessage('Booking failed. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = formData.username.trim() && formData.showtime;

  return (
    <div className="bf-root">

      {/* Step Indicator */}
      <div className="bf-steps">
        {['Details', 'Choose Seats', 'Confirm'].map((label, i) => {
          const num = i + 1;
          const isActive = step === num;
          const isDone = step > num;
          return (
            <React.Fragment key={label}>
              <div className={`bf-step ${isActive ? 'bf-step--active' : ''} ${isDone ? 'bf-step--done' : ''}`}>
                <div className="bf-step-circle">{isDone ? '✓' : num}</div>
                <span className="bf-step-label">{label}</span>
              </div>
              {i < 2 && <div className={`bf-step-line ${isDone ? 'bf-step-line--done' : ''}`} />}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step 1: Details */}
      {step === 1 && (
        <div className="bf-card">
          <h2 className="bf-card-title">Your Details</h2>

          <div className="bf-field">
            <label className="bf-label">Name</label>
            <input
              className="bf-input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="bf-field">
            <label className="bf-label">Showtime</label>
            <select
              className="bf-select"
              name="showtime"
              value={formData.showtime}
              onChange={handleChange}
            >
              <option value="">Select a showtime</option>
              {SHOWTIMES.map((t) => (
                <option key={t} value={t}>
                  {new Date(t).toLocaleString('en-IN', {
                    weekday: 'short', month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bf-btn bf-btn--primary"
            disabled={!canProceed}
            onClick={() => setStep(2)}
          >
            Choose Seats
          </button>
        </div>
      )}

      {/* Step 2: Seat Selection */}
      {step === 2 && (
        <div className="bf-seat-stage">
          <button className="bf-back-btn" onClick={() => setStep(1)}>Back</button>
          <SeatSelector onConfirm={handleSeatConfirm} />
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && seatSelection && (
        <div className="bf-card">
          <h2 className="bf-card-title">Confirm Booking</h2>

          {successMessage && <p className="bf-msg bf-msg--success">{successMessage}</p>}
          {errorMessage   && <p className="bf-msg bf-msg--error">{errorMessage}</p>}

          <div className="bf-summary">
            <div className="bf-summary-row">
              <span className="bf-summary-key">Name</span>
              <span className="bf-summary-val">{formData.username}</span>
            </div>
            <div className="bf-summary-row">
              <span className="bf-summary-key">Showtime</span>
              <span className="bf-summary-val">
                {new Date(formData.showtime).toLocaleString('en-IN', {
                  weekday: 'short', month: 'short', day: 'numeric',
                  hour: '2-digit', minute: '2-digit',
                })}
              </span>
            </div>
            <div className="bf-summary-row">
              <span className="bf-summary-key">Category</span>
              <span className={`bf-badge bf-badge--${seatSelection.category}`}>
                {seatSelection.category.charAt(0).toUpperCase() + seatSelection.category.slice(1)}
              </span>
            </div>
            <div className="bf-summary-row">
              <span className="bf-summary-key">Seats ({seatSelection.numberOfTickets})</span>
              <span className="bf-summary-val bf-seats-val">
                {seatSelection.selectedSeats.join(', ')}
              </span>
            </div>
            <div className="bf-summary-row">
              <span className="bf-summary-key">Price per seat</span>
              <span className="bf-summary-val">Rs.{seatSelection.priceOfTicket}</span>
            </div>
            <div className="bf-summary-row bf-summary-row--total">
              <span className="bf-summary-key">Total</span>
              <span className="bf-summary-val bf-total-val">
                Rs.{seatSelection.totalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="bf-confirm-actions">
            <button
              className="bf-btn bf-btn--ghost"
              onClick={() => setStep(2)}
              disabled={loading}
            >
              Change Seats
            </button>
            <button
              className="bf-btn bf-btn--primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay Rs.${seatSelection.totalPrice.toLocaleString('en-IN')}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;