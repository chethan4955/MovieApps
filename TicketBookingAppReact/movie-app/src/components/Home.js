import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if token exists

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page after logout
  };

  // Array of movie poster URLs
  const movies = [
    { title: 'Inception', poster: 'https://m.media-amazon.com/images/I/51sBr4IWDwL._AC_.jpg' },
    { title: 'The Matrix', poster: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg' },
    { title: 'Avengers: Endgame', poster: 'https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SL1500_.jpg' },
    { title: 'Titanic', poster: 'https://m.media-amazon.com/images/I/71rNJQ2g-EL._AC_SY679_.jpg' },
    { title: 'The Lion King', poster: 'https://m.media-amazon.com/images/I/51Z0nLAfLmL._AC_.jpg' },
    { title: 'The Shawshank Redemption', poster: 'https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg' },
    { title: 'Pulp Fiction', poster: 'https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg' },
    // More movies...
  ];

  return (
    <div style={styles.container}>
      <h1>Welcome to the Movie App</h1>
      <p>Your one-stop destination for movie showtimes, bookings, and more!</p>
      <div style={styles.buttonContainer}>
        {!token ? (
          <>
            <Link to="/signup" style={styles.link}>
              <button style={styles.button}>Sign Up</button>
            </Link>
            <Link to="/login" style={styles.link}>
              <button style={styles.button}>Login</button>
            </Link>
          </>
        ) : (
          <>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
            <Link to="/profile" style={styles.link}>
              <button style={styles.button}>Profile</button>
            </Link>
          </>
        )}
      </div>

      {/* Movie Posters Section */}
      <div style={styles.movieContainer}>
        {movies.map((movie, index) => (
          <div key={index} style={styles.movieCard} className="movie-card">
            <img src={movie.poster} alt={movie.title} style={styles.moviePoster} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
  },
  link: {
    textDecoration: 'none',
  },
  // Movie posters grid
  movieContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '20px',
    marginTop: '40px',
  },
  movieCard: {
    textAlign: 'center',
    fontSize: '14px',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  moviePoster: {
    width: '150px',
    height: '220px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  },
  movieCardHover: {
    transform: 'scale(1.05)', // Scale the card slightly on hover
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
  },
};

// Add hover effect using CSS
const hoverStyle = document.createElement('style');
hoverStyle.innerHTML = `
  .movie-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;
document.head.appendChild(hoverStyle);

export default Home;
