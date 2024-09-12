
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditMovie.css'; // Import the CSS file

const EditMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: '',
    genre: '',
    releaseDate: '',
    location: '',
    rating: 0
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://localhost:7204/api/Movies/${id}`);
        const movieData = response.data;

        // Format releaseDate to match input format
        const formattedDate = new Date(movieData.releaseDate).toISOString().split('T')[0];
        
        setMovie({
          ...movieData,
          releaseDate: formattedDate
        });
      } catch (err) {
        setError('Error fetching movie details');
        console.error(err);
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.put(`https://localhost:7204/api/Movies/${id}`, movie, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/admin/manage-movies');
    } catch (err) {
      setError('Failed to update movie');
      console.error(err);
    }
  };

  if (error) {
    return <p id="error-message">{error}</p>;
  }

  return (
    <div id="edit-movie-container">
      <h2 id="edit-movie-title">Edit Movie</h2>
      <form id="edit-movie-form" onSubmit={handleSubmit}>
        <div id="title-group" className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
            required
          />
        </div>
        <div id="genre-group" className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input
            id="genre"
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div id="release-date-group" className="form-group">
          <label htmlFor="releaseDate">Release Date:</label>
          <input
            id="releaseDate"
            type="date"
            name="releaseDate"
            value={movie.releaseDate}
            onChange={handleChange}
            required
          />
        </div>
        <div id="location-group" className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            name="location"
            value={movie.location}
            onChange={handleChange}
            required
          />
        </div>
        <div id="rating-group" className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            id="rating"
            type="number"
            name="rating"
            value={movie.rating}
            onChange={handleChange}
            min="0"
            max="10"
            required
          />
        </div>
        <button id="update-movie-button" type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default EditMovie;









