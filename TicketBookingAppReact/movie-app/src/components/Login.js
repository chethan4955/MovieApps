
import React, { useState } from 'react';
import axiosInstance from '../Auth/axiosInstance'; // Adjust the import path if necessary
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await axiosInstance.post('/auth/authenticate', { email, password });

      // Extract token and user info from response
      const { token, username, role } = response.data;

      // Store token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);

      // Navigate to the home page
      navigate('/movies');
    } catch (error) {
      setError('Failed to login. Please check your credentials and try again.');
      console.error(error);
    }
  };

  return (
   
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card-body shadow p-4 mb-5 bg-white rounded">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
              {error && <p className="text-danger text-center">{error}</p>}
            </form>
          </div>
        </div>
      </div>
   
  );
}

export default Login;
