

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddMovie.css';

const AddMovie = () => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    genre: '',
    rating: '',
    releaseDate: '',
    imageUrl: '',
    director: '',
    language: '',
    showTimes: [{ time: '', location: '' }],
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleShowTimeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedShowTimes = [...movie.showTimes];
    updatedShowTimes[index] = { ...updatedShowTimes[index], [name]: value };
    setMovie({ ...movie, showTimes: updatedShowTimes });
  };

  const addShowTime = () => {
    setMovie({
      ...movie,
      showTimes: [...movie.showTimes, { time: '', location: '' }],
    });
  };

  const removeShowTime = (index) => {
    const updatedShowTimes = movie.showTimes.filter((_, i) => i !== index);
    setMovie({ ...movie, showTimes: updatedShowTimes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formattedReleaseDate = new Date(movie.releaseDate).toISOString().split('.')[0];
    const formattedShowTimes = movie.showTimes.map(showTime => ({
      ...showTime,
      time: new Date(showTime.time).toISOString().split('.')[0],
    }));

    try {
      const token = localStorage.getItem('token');

      // Send POST request to add the movie
      const response = await axios.post(
        'https://localhost:7204/api/Movies',
        {
          title: movie.title,
          description: movie.description,
          genre: movie.genre,
          rating: parseFloat(movie.rating),
          releaseDate: formattedReleaseDate,
          imageUrl: movie.imageUrl,
          director: movie.director,
          language: movie.language,
          showTimes: formattedShowTimes,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      // Get the movie ID from the response
      const movieId = response.data.id; // Assuming the API returns the new movie's ID in response.data.id

      // Navigate to the EditMovie page with the movie ID
      navigate(`/admin/edit-movie/${movieId}`);
    } catch (err) {
      setError('Failed to add movie');
      console.error(err);
    }
  };

  return (
    <div id="add-movie-container">
      <h2 id="add-movie-title">Add New Movie</h2>
      <form id="add-movie-form" onSubmit={handleSubmit}>
        <div className="form-group" id="title-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group" id="description-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={movie.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group" id="genre-group">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group" id="rating-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={movie.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group" id="release-date-group">
          <label htmlFor="releaseDate">Release Date:</label>
          <input
            type="datetime-local"
            id="releaseDate"
            name="releaseDate"
            value={movie.releaseDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group" id="image-url-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={movie.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group" id="director-group">
          <label htmlFor="director">Director:</label>
          <input
            type="text"
            id="director"
            name="director"
            value={movie.director}
            onChange={handleChange}
          />
        </div>
        <div className="form-group" id="language-group">
          <label htmlFor="language">Language:</label>
          <input
            type="text"
            id="language"
            name="language"
            value={movie.language}
            onChange={handleChange}
          />
        </div>
        <div className="form-group" id="show-times-group">
          <label>Show Times:</label>
          {movie.showTimes.map((showTime, index) => (
            <div key={index} className="show-time-group" id={`show-time-group-${index}`}>
              <input
                type="datetime-local"
                id={`show-time-${index}`}
                name="time"
                value={showTime.time}
                onChange={(e) => handleShowTimeChange(index, e)}
                required
              />
              <input
                type="text"
                id={`show-location-${index}`}
                name="location"
                value={showTime.location}
                onChange={(e) => handleShowTimeChange(index, e)}
                required
              />
              <button
                type="button"
                onClick={() => removeShowTime(index)}
                className="remove-btn"
                id={`remove-show-time-${index}`}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-show-time-btn"
            id="add-show-time-btn"
            onClick={addShowTime}
          >
            Add Show Time
          </button>
        </div>
        <button type="submit" className="submit-btn" id="submit-btn">
          Add Movie
        </button>
        {error && <div className="error-message" id="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default AddMovie;


