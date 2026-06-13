import React, { useState, useCallback } from 'react';
import './SeatSelector.css';

const PRICES = { platinum: 500, gold: 300, silver: 100 };

const LAYOUT = [
  {
    type: 'platinum',
    label: 'PLATINUM',
    rows: [
      { id: 'A', seats: [1,2,3,4,5,null,6,7,8,9,10,11,12,null,13,14,15,16,17] },
      { id: 'B', seats: [1,2,3,4,5,null,6,7,8,9,10,11,12,null,13,14,15,16,17] },
      { id: 'C', seats: [1,2,3,4,5,null,6,7,8,9,10,11,12,null,13,14,15,16,17] },
    ],
  },
  {
    type: 'gold',
    label: 'GOLD',
    rows: [
      { id: 'D', seats: [1,2,3,4,5,6,null,7,8,9,10,11,12,13,null,14,15,16,17,18,19] },
      { id: 'E', seats: [1,2,3,4,5,6,null,7,8,9,10,11,12,13,null,14,15,16,17,18,19] },
      { id: 'F', seats: [1,2,3,4,5,6,null,7,8,9,10,11,12,13,null,14,15,16,17,18,19] },
      { id: 'G', seats: [1,2,3,4,5,6,null,7,8,9,10,11,12,13,null,14,15,16,17,18,19] },
    ],
  },
  {
    type: 'silver',
    label: 'SILVER',
    rows: [
      { id: 'H', seats: [1,2,3,4,5,6,7,null,8,9,10,11,12,13,14,15,null,16,17,18,19,20,21] },
      { id: 'I', seats: [1,2,3,4,5,6,7,null,8,9,10,11,12,13,14,15,null,16,17,18,19,20,21] },
      { id: 'J', seats: [1,2,3,4,5,6,7,null,8,9,10,11,12,13,14,15,null,16,17,18,19,20,21] },
      { id: 'K', seats: [1,2,3,4,5,6,7,null,8,9,10,11,12,13,14,15,null,16,17,18,19,20,21] },
      { id: 'L', seats: [1,2,3,4,5,6,7,null,8,9,10,11,12,13,14,15,null,16,17,18,19,20,21] },
    ],
  },
];

// Generate a stable set of pre-booked seats (seeded random)
function generateBookedSeats() {
  const booked = new Set();
  const pseudoRandom = (seed) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  let seed = 42;
  LAYOUT.forEach((section) => {
    section.rows.forEach((row) => {
      row.seats.forEach((seatNum) => {
        seed++;
        if (seatNum !== null && pseudoRandom(seed) < 0.22) {
          booked.add(`${row.id}-${seatNum}`);
        }
      });
    });
  });
  return booked;
}

const BOOKED_SEATS = generateBookedSeats();

function getSeatCategory(rowId) {
  for (const section of LAYOUT) {
    for (const row of section.rows) {
      if (row.id === rowId) return section.type;
    }
  }
  return 'silver';
}

const Toast = ({ message }) => (
  message ? <div className="ss-toast">{message}</div> : null
);

const Seat = ({ rowId, seatNum, isBooked, isSelected, category, onToggle }) => {
  const key = `${rowId}-${seatNum}`;
  let cls = `ss-seat ss-seat--${category}`;
  if (isBooked) cls += ' ss-seat--booked';
  else if (isSelected) cls += ' ss-seat--selected';

  return (
    <button
      className={cls}
      onClick={() => !isBooked && onToggle(rowId, seatNum)}
      title={isBooked ? 'Already booked' : `${rowId}${seatNum} · ₹${PRICES[category]}`}
      aria-label={`Seat ${rowId}${seatNum}${isBooked ? ' (booked)' : isSelected ? ' (selected)' : ''}`}
      aria-pressed={isSelected}
      disabled={isBooked}
    />
  );
};

const SeatSelector = ({ onConfirm }) => {
  const [selected, setSelected] = useState(new Set());
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const toggleSeat = useCallback((rowId, seatNum) => {
    const key = `${rowId}-${seatNum}`;
    const cat = getSeatCategory(rowId);

    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
        return next;
      }
      if (next.size > 0) {
        const existingCat = getSeatCategory([...next][0].split('-')[0]);
        if (existingCat !== cat) {
          showToast('Please select seats from one category only');
          return prev;
        }
      }
      if (next.size >= 8) {
        showToast('Maximum 8 seats allowed per booking');
        return prev;
      }
      next.add(key);
      return next;
    });
  }, []);

  const sortedSeats = [...selected].sort();
  const category = sortedSeats.length > 0 ? getSeatCategory(sortedSeats[0].split('-')[0]) : null;
  const pricePerTicket = category ? PRICES[category] : 0;
  const totalPrice = sortedSeats.length * pricePerTicket;

  const handleConfirm = () => {
    if (!category) return;
    onConfirm({
      selectedSeats: sortedSeats.map((k) => {
        const [r, s] = k.split('-');
        return `${r}${s}`;
      }),
      numberOfTickets: sortedSeats.length,
      priceOfTicket: pricePerTicket,
      totalPrice,
      category,
    });
  };

  return (
    <div className="ss-wrapper">
      <Toast message={toast} />

      {/* Screen */}
      <div className="ss-screen-wrap">
        <div className="ss-screen" />
        <span className="ss-screen-label">All eyes this way please</span>
      </div>

      {/* Legend */}
      <div className="ss-legend">
        {[
          { type: 'platinum', label: 'Platinum', price: 500 },
          { type: 'gold', label: 'Gold', price: 300 },
          { type: 'silver', label: 'Silver', price: 100 },
          { type: 'booked', label: 'Booked' },
          { type: 'selected', label: 'Selected' },
        ].map((item) => (
          <div className="ss-legend-item" key={item.type}>
            <div className={`ss-legend-dot ss-legend-dot--${item.type}`} />
            <span>{item.label}{item.price ? ` ₹${item.price}` : ''}</span>
          </div>
        ))}
      </div>

      {/* Seat Hall */}
      <div className="ss-hall">
        {LAYOUT.map((section) => (
          <div key={section.type} className="ss-section">
            <div className="ss-section-label">
              {section.label}
              <span className="ss-section-price"> · ₹{PRICES[section.type]}</span>
            </div>
            <div className="ss-rows">
              {section.rows.map((row) => (
                <div className="ss-row" key={row.id}>
                  <span className="ss-row-label">{row.id}</span>
                  {row.seats.map((seatNum, idx) =>
                    seatNum === null ? (
                      <div className="ss-aisle" key={`aisle-${idx}`} />
                    ) : (
                      <Seat
                        key={`${row.id}-${seatNum}`}
                        rowId={row.id}
                        seatNum={seatNum}
                        category={section.type}
                        isBooked={BOOKED_SEATS.has(`${row.id}-${seatNum}`)}
                        isSelected={selected.has(`${row.id}-${seatNum}`)}
                        onToggle={toggleSeat}
                      />
                    )
                  )}
                  <span className="ss-row-label">{row.id}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Booking Panel */}
      <div className="ss-panel">
        <div className="ss-panel-stats">
          <div className="ss-stat">
            <span className="ss-stat-label">Seats</span>
            <span className="ss-stat-value">{sortedSeats.length || '—'}</span>
          </div>
          <div className="ss-stat">
            <span className="ss-stat-label">Category</span>
            <span className="ss-stat-value ss-stat-value--cat">
              {category
                ? `${category.charAt(0).toUpperCase() + category.slice(1)} · ₹${pricePerTicket}`
                : '—'}
            </span>
          </div>
          <div className="ss-stat">
            <span className="ss-stat-label">Total</span>
            <span className="ss-stat-value ss-stat-value--total">
              {totalPrice ? `₹${totalPrice.toLocaleString('en-IN')}` : '—'}
            </span>
          </div>
        </div>

        {sortedSeats.length > 0 && (
          <div className="ss-tags">
            {sortedSeats.map((k) => {
              const [r, s] = k.split('-');
              return (
                <span key={k} className={`ss-tag ss-tag--${category}`}>
                  {r}{s}
                </span>
              );
            })}
          </div>
        )}

        {sortedSeats.length === 0 && (
          <p className="ss-empty">Select seats above to continue</p>
        )}

        <button
          className="ss-confirm-btn"
          disabled={sortedSeats.length === 0}
          onClick={handleConfirm}
        >
          {sortedSeats.length > 0
            ? `Confirm ${sortedSeats.length} seat${sortedSeats.length > 1 ? 's' : ''} · ₹${totalPrice.toLocaleString('en-IN')}`
            : 'Select seats to continue'}
        </button>
      </div>
    </div>
  );
};

export default SeatSelector;
