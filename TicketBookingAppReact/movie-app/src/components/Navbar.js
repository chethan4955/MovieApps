import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username'); // Get username from localStorage

  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleGetBookingDetails = () => {
    navigate('/BookingDetails');
  };

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand movie-app-link" to="/">ShowTime</Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={showMenu ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/movies">Home</Link>
            </li>
            <li className="nav-item">
              <form className="form-inline search-bar" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search by Genre or Movie Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control search-input"
                />
                <button type="submit" className="btn search-button">
                  Search
                </button>
              </form>
            </li>
           
            {token && (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">Welcome, {username}!</span> {/* Display the welcome message */}
                </li>
                {role === 'Admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
                  </li>
                )}
               
                <li className="nav-item">
                  <button onClick={handleGetBookingDetails} className="nav-link btn btn-link">Booking Details</button>
                </li>
              
                <li className="nav-item">
                  <Link className="nav-link" to="/Profile">Profile</Link>
                </li>
                <li className="nav-item">
              <Link className="nav-link" to="/">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link btn btn-link">Logout</button>
                </li>
              </>
            )}
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
