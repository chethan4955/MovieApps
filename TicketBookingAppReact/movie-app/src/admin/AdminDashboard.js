

// src/admin/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <header className="header">
        <h1>Admin Dashboard</h1>
      </header>
      <nav className="navbar">
        <ul>
          <li><Link to="/admin/manage-movies">Manage Movies</Link></li>
          <li><Link to="/admin/add-movie">Add New Movie</Link></li>
          <li><Link to="/admin/edit-movie/:id">Edit Movie Details</Link></li>
          <li><Link to="/admin/BookingViews">Booking Lists</Link></li>
          <li><Link to="/admin/UserDetails">UserDetails</Link></li>
          <li><Link to="/admin/UserAnalysis">Data Analysis</Link></li>


          
        </ul>
      </nav>
      <div className="main-content">
        {/* Main content goes here */}
        <h1> Hey ! Admin Ready To Add New Movies </h1>
      
      </div>
    </div>
  );
};

export default AdminDashboard;
