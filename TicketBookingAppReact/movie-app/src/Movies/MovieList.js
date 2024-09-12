

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    fetchMovies();
  }, [location.search]);

  const fetchMovies = async () => {
    const token = localStorage.getItem('token');
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') || '';

    try {
      const response = await axios.get('https://localhost:7204/api/Movies/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const allMovies = response.data;

      const filteredMovies = allMovies.filter(
        (movie) =>
          movie.genre.toLowerCase().includes(query.toLowerCase()) ||
          movie.title.toLowerCase().includes(query.toLowerCase())
      );

      setMovies(filteredMovies);
    } catch (err) {
      setError('Failed to fetch movies');
      console.error(err);
    }
  };

  const groupMoviesByGenre = (movies) => {
    return movies.reduce((acc, movie) => {
      const genre = movie.genre || 'Unknown';
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(movie);
      return acc;
    }, {});
  };

  const groupedMovies = groupMoviesByGenre(movies);

  const scroll = (direction, id) => {
    const scrollContainer = document.getElementById(id);
    if (scrollContainer) {
      const scrollAmount = 1000;
      scrollContainer.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const viewMovieDetails = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div>
      <h2 id='Up'>Book Tickets Now </h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {Object.keys(groupedMovies).map((genre, index) => (
        <section key={genre} className="movie-list-container">
          <h3>{genre}</h3>
          <button className="scroll-button left" onClick={() => scroll('left', `movie-list-${index}`)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15.88 17.88L12 14l-3.88 3.88L7 17.88 12 13l5 5-1.12 1.12z" />
            </svg>
          </button>
          <div className="movie-list" id={`movie-list-${index}`}>
            {groupedMovies[genre].map((movie) => (
              <div className="movie-card" key={movie.id}>
                <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
                <p className="movie-title">{movie.title}</p>
                <button className="view-details-button" onClick={() => viewMovieDetails(movie.id)}>
                  View Details
                </button>
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={() => scroll('right', `movie-list-${index}`)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M8.12 6.12L12 10l3.88-3.88L17 7.12 12 12l-5-5 1.12-1.12z" />
            </svg>
          </button>
        </section>
      ))}
    </div>
  );
};

export default MovieList;
