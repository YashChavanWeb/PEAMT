import React, { useState, useEffect } from 'react';
import ExamCardDisplay from './ExamCardDisplay';

function UserDashboard() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <ExamCardDisplay exams={exams} />
    );
}

export default UserDashboard;
