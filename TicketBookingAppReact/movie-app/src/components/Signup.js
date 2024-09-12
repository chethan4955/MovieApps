
import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Import your CSS file for any additional styling
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'User'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://localhost:7130/api/Auth/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('User Registered Successfully!');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.Message) {
        setError(err.response.data.Message);
      } else {
        setError('An error occurred while registering.');
      }
    }
  };

  return (
    
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="role" className="form-label">Role:</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="form-control"
                  >
                    <option value="User">User</option>
                    {/* <option value="Admin">Admin</option> */}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
                {error && <p className="text-danger text-center">{error}</p>}
                <div className="mt-4 text-center">
                  <span className="text-gray-400">
                    Already have an account?
                    <a className="text-white hover:underline" href="#">Sign In</a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default Signup;




