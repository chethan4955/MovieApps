import React, { useState, useEffect } from 'react';
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

  // Step 1 = showtime + username, Step 2 = seat selection, Step 3 = confirm
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    username: '',
    showtime: '',
    numberOfTickets: 0,
    priceOfTicket: 0,
  });

  const [seatSelection, setSeatSelection] = useState(null); // { selectedSeats, numberOfTickets, priceOfTicket, totalPrice, category }
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Called by SeatSelector when user confirms seat selection
  const handleSeatConfirm = (selection) => {
    setSeatSelection(selection);
    setFormData((prev) => ({
      ...prev,
      numberOfTickets: selection.numberOfTickets,
      priceOfTicket: selection.priceOfTicket,
    }));
    setStep(3);
  };

  const canProceedToSeats = formData.username.trim() && formData.showtime;

  const handleSubmit = async () => {
    if (!seatSelection) return;
    setLoading(true);
    setErrorMessage('');

    const token = localStorage.getItem('token');
    const bookingData = {
      ...formData,
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

      const seatsDisplay = seatSelection.selectedSeats.join(', ');
      const mail = {
        ToEmail: 'chinna4955@gmail.com',
        toName: formData.username,
        subject: 'Booking Confirmation',
        body: `Thanks for booking, ${formData.username}!\n\nShowtime: ${new Date(formData.showtime).toLocaleString()}\nSeats: ${seatsDisplay}\nCategory: ${seatSelection.category}\nTotal: ₹${seatSelection.totalPrice}`,
      };

      await axios.post('https://localhost:7161/api/Mail', mail);

      setSuccessMessage('Booking confirmed! Email sent.');
      setTimeout(() => navigate('/BookingDetails'), 2000);
    } catch (error) {
      setErrorMessage('Booking failed. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

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
                <div className="bf-step-circle">
                  {isDone ? '✓' : num}
                </div>
                <span className="bf-step-label">{label}</span>
              </div>
              {i < 2 && <div className={`bf-step-line ${isDone ? 'bf-step-line--done' : ''}`} />}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Step 1: Details ── */}
      {step === 1 && (
        <div className="bf-card">
          <h2 className="bf-card-title">Your Details</h2>

          {errorMessage && <p className="bf-msg bf-msg--error">{errorMessage}</p>}

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
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bf-btn bf-btn--primary"
            disabled={!canProceedToSeats}
            onClick={() => setStep(2)}
          >
            Choose Seats →
          </button>
        </div>
      )}

      {/* ── Step 2: Seat Selection ── */}
      {step === 2 && (
        <div className="bf-seat-stage">
          <button className="bf-back-btn" onClick={() => setStep(1)}>
            ← Back
          </button>
          <SeatSelector onConfirm={handleSeatConfirm} />
        </div>
      )}

      {/* ── Step 3: Confirm ── */}
      {step === 3 && seatSelection && (
        <div className="bf-card">
          <h2 className="bf-card-title">Confirm Booking</h2>

          {successMessage && <p className="bf-msg bf-msg--success">{successMessage}</p>}
          {errorMessage && <p className="bf-msg bf-msg--error">{errorMessage}</p>}

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
              <span className="bf-summary-val">₹{seatSelection.priceOfTicket}</span>
            </div>
            <div className="bf-summary-row bf-summary-row--total">
              <span className="bf-summary-key">Total</span>
              <span className="bf-summary-val bf-total-val">
                ₹{seatSelection.totalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="bf-confirm-actions">
            <button
              className="bf-btn bf-btn--ghost"
              onClick={() => setStep(2)}
              disabled={loading}
            >
              ← Change Seats
            </button>
            <button
              className="bf-btn bf-btn--primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay ₹${seatSelection.totalPrice.toLocaleString('en-IN')}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
