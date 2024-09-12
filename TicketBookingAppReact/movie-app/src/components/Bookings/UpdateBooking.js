import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './UpdateBooking.css'; // Import your custom CSS file

const UpdateBooking = () => {
  const [username, setUsername] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState('');
  const [showtime, setShowtime] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://localhost:7291/api/Booking/${username}`, {
        numberOfTickets,
        showtime,
        status,
      });

      if (response.status === 204) {
        setSuccess('Booking updated successfully!');
        setError(null);
      } else {
        setError('Failed to update booking.');
        setSuccess(null);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      setError('Failed to update booking.');
      setSuccess(null);
    }
  };

  return (
    <Container className="mt-4" id="UpdateBooking-container">
      <h2>Update Booking</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="UpdateBooking-formUsername" id="UpdateBooking-formGroup">
          <Form.Label id="UpdateBooking-formLabel">Username</Form.Label>
          <Form.Control
            id="UpdateBooking-formControl"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="UpdateBooking-formNumberOfTickets" id="UpdateBooking-formGroup">
          <Form.Label id="UpdateBooking-formLabel">Number of Tickets</Form.Label>
          <Form.Control
            id="UpdateBooking-formControl"
            type="number"
            placeholder="Enter number of tickets"
            value={numberOfTickets}
            onChange={(e) => setNumberOfTickets(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="UpdateBooking-formShowtime" id="UpdateBooking-formGroup">
          <Form.Label id="UpdateBooking-formLabel">Showtime</Form.Label>
          <Form.Control
            id="UpdateBooking-formControl"
            type="datetime-local"
            value={showtime}
            onChange={(e) => setShowtime(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="UpdateBooking-formStatus" id="UpdateBooking-formGroup">
          <Form.Label id="UpdateBooking-formLabel">Status</Form.Label>
          <Form.Select
            id="UpdateBooking-formControl"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select status</option>
            <option value="Booked">Booked</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" id="UpdateBooking-button">
          Update Booking
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3" id="UpdateBooking-alert-danger">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3" id="UpdateBooking-alert-success">{success}</Alert>}
    </Container>
  );
};

export default UpdateBooking;
