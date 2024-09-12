import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './UserAnalysis.css'; // Import the CSS file

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const UserAnalysis = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Counts',
                data: [],
                backgroundColor: ['#36a2eb', '#ff6384', '#4bc0c0'],
                borderColor: ['#fff', '#fff', '#fff'],
                borderWidth: 1,
            },
        ],
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch counts from the APIs
                const [movieCountResponse, bookingCountResponse, authCountResponse] = await Promise.all([
                    axios.get('https://localhost:7204/api/Movies/count'),
                    axios.get('https://localhost:7291/api/Booking/count'),
                    axios.get('https://localhost:7130/api/Auth/count'),
                ]);

                // Extract and parse counts
                const movieCount = parseInt(movieCountResponse.data.count, 10); // Note the lowercase 'count'
                const bookingCount = parseInt(bookingCountResponse.data.count, 10); // Note the lowercase 'count'
                const authCount = parseInt(authCountResponse.data.count, 10); // Note the lowercase 'count'

                // Validate counts
                if (isNaN(movieCount) || isNaN(bookingCount) || isNaN(authCount)) {
                    throw new Error('Invalid data received from API');
                }

                // Calculate total count and percentages
                const totalCount = movieCount + bookingCount + authCount;
                if (totalCount === 0) {
                    throw new Error('Total count is zero, cannot calculate percentages');
                }

                const moviePercentage = ((movieCount / totalCount) * 100).toFixed(2);
                const bookingPercentage = ((bookingCount / totalCount) * 100).toFixed(2);
                const authPercentage = ((authCount / totalCount) * 100).toFixed(2);

                setChartData({
                    labels: [
                        `Movies (${moviePercentage}%)`,
                        `Bookings (${bookingPercentage}%)`,
                        `Users (${authPercentage}%)`,
                    ],
                    datasets: [
                        {
                            label: 'Counts',
                            data: [movieCount, bookingCount, authCount],
                            backgroundColor: ['#36a2eb', '#ff6384', '#4bc0c0'],
                            borderColor: ['#fff', '#fff', '#fff'],
                            borderWidth: 1,
                        },
                    ],
                });

                setError(null); // Clear any previous errors
            } catch (error) {
                console.error('Error fetching data for pie chart:', error);
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    return (
        <div className="user-analysis-container">
            <h2 className="user-analysis-header">Data Analysis</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="pie-chart">
                <Pie data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </div>
        </div>
    );
};

export default UserAnalysis;
