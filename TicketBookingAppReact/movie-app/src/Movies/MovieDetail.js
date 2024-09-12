

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetails.css'; // Import CSS for styling

const MovieDetail = () => {
  const { id } = useParams(); // Get movie ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      const token = localStorage.getItem('token'); // Get token from local storage

      try {
        const response = await axios.get(`https://localhost:7204/api/Movies/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setMovie(response.data);
      } catch (err) {
        setError('Error fetching movie details');
        console.error(err);
      }
    };

    fetchMovie();
  }, [id]);

  const handleBookTickets = () => {
    // Pass the movie ID to the booking page
    navigate(`/bookings/${id}`); // navigate to the booking page with movieId
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="movie-detail-containers">
      <div className="movie-card-detail">
        <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
        <div className="movie-detail-information">
          <h2>{movie.title}</h2>
          <p><strong>Description:</strong> {movie.description}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Language:</strong> {movie.language}</p>

          <div className="movie-showtimes">
            <h4>Show Times:</h4>
            {movie.showTimes.length > 0 ? (
              <ul>
                {movie.showTimes.map((showTime, index) => (
                  <li key={index}>
                    <p><strong>Time:</strong> {showTime.time}</p>
                    <p><strong>Location:</strong> {showTime.location}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No show times available.</p>
            )}
          </div>

          <button className="book-tickets-btn" onClick={handleBookTickets}>
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
