

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import MovieList from './Movies/MovieList';
import MovieDetail from './Movies/MovieDetail';

import EditMovie from './admin/EditMovie';
import AddMovie from './admin/AddMovie';
import ManageMovies from './admin/ManageMovies';
import AdminDashboard from './admin/AdminDashboard';
import Footer from './components/Footer';
import BookingForm from './components/Bookings/BookingForm';
import './index.css';
import Profile from './components/Profile';
import Home from './components/Home';
import BookingDetails from './components/Bookings/BookingDetails';
import UpdateBooking from './components/Bookings/UpdateBooking';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import CancelBooking from './components/Bookings/CancelBookingComponent';
import './App.css';
import SeatSelector from './components/Bookings/SeatSelector';
import Bookings from './admin/BookingsViews';
import GetAllUsers from './admin/GetAllUsers';
import ContactForm from './components/ContactForm';
import UserAnalysis from './admin/UserAnalysis';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/' element={<Home/>}/>
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/movies" element={<MovieList />} />
            <Route path="/search" element={<MovieList />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage-movies" element={<ManageMovies />} />
            <Route path="/admin/add-movie" element={<AddMovie />} />
            <Route path="/admin/edit-movie/:id" element={<EditMovie />} />
            <Route path="/bookings/:movieId" element={<BookingForm />} />
            <Route path='/BookingDetails' element={<BookingDetails/>}/>
            <Route path='/EditBookingDetails' element={<UpdateBooking/>}/>
            <Route path='/cancelbooking' element={<CancelBooking/>}/>
            <Route path='/contact' element={<ContactForm/>}/>
            <Route path='/admin/BookingViews' element={<Bookings/>}/>
            <Route path='/admin/UserDetails' element={<GetAllUsers/>}/>
          <Route path="/bookings/:movieId/seats" element={<SeatSelector  />} />
           <Route path='/admin/UserAnalysis' element={<UserAnalysis/>}/> 

          </Routes>
        </main>
        <Footer className="footer" />
      </div>
    </Router>
  );
}

export default App;
