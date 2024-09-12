import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/manageMovieList.css';

const ManageMovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://localhost:7204/api/Movies/all');
        setMovies(response.data);
      } catch (err) {
        console.error('Failed to fetch movies', err);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (id) => {
    setSelectedMovieId(id);
    navigate(`/admin/edit-movie/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7204/api/Movies/${id}`);
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (err) {
      console.error('Failed to delete movie', err);
    }
  };

  return (
    <div id="movie-list-containers">
      {movies.map((movie) => (
        <div key={movie.id} id="movie-card" onClick={() => handleMovieClick(movie.id)}>
          <h3>{movie.title}</h3>
          <img id='img' src={movie.imageUrl} alt={movie.title} />
          <button id='button' onClick={(e) => { e.stopPropagation(); handleDelete(movie.id); }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageMovieList;
