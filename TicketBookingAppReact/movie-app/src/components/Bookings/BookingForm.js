

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

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

//   const ticketPrices = [100, 300, 500]; // Example prices for tickets

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
//         subject: " Sucess Booking conformation",
//         body: `Thanks for booking, ${formData.username}. Your booking details are as follows:\n\nShowtime: ${formData.showtime}\nNumber of Tickets: ${formData.numberOfTickets}\nTotal Price: $${totalPrice}`
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
//             <option key={price} value={price}>${price}</option>
//           ))}
//         </select>
//       </div>

//       {/* Display the total price */}
//       <div style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>
//         <label>Total Price: ${totalPrice}</label>
//       </div>

//       <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s ease' }}>
//         Book Tickets
//       </button>
//     </form>
//   );
// };

// export default BookingForm;










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const { movieId } = useParams(); // Get movieId from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    showtime: '',
    numberOfTickets: 0,
    priceOfTicket: 0,
  });
  const [totalPrice, setTotalPrice] = useState(0); // State for total price
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showtimes = [
    '2024-09-10T14:00',
    '2024-09-10T17:00',
    '2024-09-10T20:00',
    '2024-09-11T14:00',
    '2024-09-11T17:00',
    '2024-09-11T20:00',
  ];

  const ticketPrices = [
    { value: 100, label: 'Silver' },
    { value: 300, label: 'Gold' },
    { value: 500, label: 'Platinum' }
  ]; // Updated with labels

  // Calculate total price based on number of tickets and price per ticket
  useEffect(() => {
    const calculatedPrice = formData.numberOfTickets * formData.priceOfTicket;
    setTotalPrice(calculatedPrice);
  }, [formData.numberOfTickets, formData.priceOfTicket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assume a token is required
    const bookingData = {
      ...formData,
      movieId: parseInt(movieId), // Include movieId in the request
    };

    try {
      // Post booking data
      const response = await axios.post('https://localhost:7291/api/Booking', bookingData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Email notification data
      const mail = {
        ToEmail: 'chinna4955@gmail.com',
        toName: formData.username,
        subject: "Booking Confirmation",
        body: `Thanks for booking, ${formData.username}. Your booking details are as follows:\n\nShowtime: ${formData.showtime}\nNumber of Tickets: ${formData.numberOfTickets}\nTotal Price: ₹${totalPrice}`
      };

      // Post email data
      await axios.post("https://localhost:7161/api/Mail", mail);

      setSuccessMessage('Tickets booked successfully and email sent!');
      setTimeout(() => {
        navigate('/BookingDetails'); // Redirect after a successful booking
      }, 2000);
    } catch (error) {
      setErrorMessage('Error creating booking. Please try again.');
      console.error('Error creating booking:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Showtime:</label>
        <select name="showtime" value={formData.showtime} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <option value="">Select a showtime</option>
          {showtimes.map((time) => (
            <option key={time} value={time}>{new Date(time).toLocaleString()}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Number of Tickets:</label>
        <input type="number" name="numberOfTickets" value={formData.numberOfTickets} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Price per Ticket:</label>
        <select name="priceOfTicket" value={formData.priceOfTicket} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <option value="">Select a ticket price</option>
          {ticketPrices.map((price) => (
            <option key={price.value} value={price.value}>{price.label} - ₹{price.value}</option>
          ))}
        </select>
      </div>

      {/* Display the total price */}
      <div style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>
        <label>Total Price: ₹{totalPrice}</label>
      </div>

      <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s ease' }}>
        Book Tickets
      </button>
    </form>
  );
};

export default BookingForm;
