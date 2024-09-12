
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GetAllUsers.css'; // Custom CSS for card styling

const GetAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users when component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:7130/api/Auth/all'); // Update with your API URL
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (username) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete user: ${username}?`);
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://localhost:7130/api/Auth/${username}`);
            setUsers(users.filter(user => user.userName !== username));
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="users-container">
            <h2>All Users</h2>
            <div className="users-card">
                {users.length > 0 ? (
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.userName}>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button 
                                            onClick={() => handleDelete(user.userName)} 
                                            id="delete1-btn">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default GetAllUsers;


