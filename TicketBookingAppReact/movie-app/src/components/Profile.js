

// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../Auth/axiosInstance'; // Adjust the import path if necessary

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to handle edit mode
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem('username'); // Get username from localStorage
        if (!email) {
          throw new Error('No user email found in localStorage');
        }

        const response = await axiosInstance.get(`/auth/${email}`);
        setUser(response.data);
        setFormData({
          email: response.data.email,
          password: ''
        });
      } catch (error) {
        console.error('There was an error fetching the user!', error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem('username');
      const response = await axiosInstance.put(`/auth/${email}`, formData);
      alert('Profile updated successfully');
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating profile:', error.response?.data?.Message || error.message);
      alert(error.response?.data?.Message || 'Error updating profile');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Profile</h2>
        {!isEditing ? (
          <>
            <p><strong>Username:</strong> {user.userName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>

            <div style={styles.buttonsContainer}>
              <button style={styles.editButton} onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>

              <button style={styles.logoutButton} onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('role');
                window.location.href = '/login'; // Redirect to login page after logout
              }}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Leave blank to keep the same"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>

            <div style={styles.buttonsContainer}>
              <button type="submit" style={styles.saveButton}>
                Save
              </button>

              <button
                type="button"
                style={styles.cancelButton}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '300px',
    textAlign: 'center'
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333'
  },
  buttonsContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  editButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  formGroup: {
    marginBottom: '15px',
    textAlign: 'left'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginTop: '5px'
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Profile;

