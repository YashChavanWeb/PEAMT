import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ExamCardDisplay from './ExamCardDisplay';

function UserDashboard() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await fetch('/api/exams'); // Adjust the endpoint as needed
                if (response.ok) {
                    const data = await response.json();
                    setExams(data);
                } else {
                    setError('Failed to fetch exams');
                }
            } catch (error) {
                setError('Error fetching exams');
            } finally {
                setLoading(false);
            }
        };

        fetchExams();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-4">
            <button
                onClick={() => navigate('/my-exams')}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
            >
                Go to My Exams
            </button>
            <ExamCardDisplay exams={exams} />
        </div>
    );
}

export default UserDashboard;
