import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function MyExams() {
    const { currentUser } = useSelector((state) => state.user);
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch exam details based on the username
    const fetchExamDetails = async () => {
        if (!currentUser.username) {
            setError('Username not available.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/regform/username/${currentUser.username}/exams/details`);
            if (!response.ok) {
                throw new Error('Failed to fetch exam details');
            }
            const data = await response.json();
            setExams(data || []); // Set exam details if available
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExamDetails();
    }, [currentUser.username]); // Fetch exam details when username changes

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">My Exams</h1>

            {/* Render exam details in a timetable format */}
            {loading ? (
                <p className="text-lg text-gray-600">Loading exam details...</p>
            ) : error ? (
                <p className="text-lg text-red-600">Error: {error}</p>
            ) : (
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Upcoming Exams:</h3>
                    {exams.length > 0 ? (
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                            <thead>
                                <tr className="bg-gray-100 text-left text-gray-600">
                                    <th className="px-6 py-3 border-b">Exam Name</th>
                                    <th className="px-6 py-3 border-b">Duration</th>
                                    <th className="px-6 py-3 border-b">Eligibility</th>
                                    <th className="px-6 py-3 border-b">Exam Date</th>
                                    <th className="px-6 py-3 border-b">Registration End Date</th>
                                    <th className="px-6 py-3 border-b">Total Marks</th>
                                    <th className="px-6 py-3 border-b">Passing Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exams.map((exam, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 border-b">{exam.examName}</td>
                                        <td className="px-6 py-4 border-b">{exam.duration}</td>
                                        <td className="px-6 py-4 border-b">{exam.eligibility}</td>
                                        <td className="px-6 py-4 border-b">{new Date(exam.examDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 border-b">{new Date(exam.registrationEndDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 border-b">{exam.totalMarks}</td>
                                        <td className="px-6 py-4 border-b">{exam.passingMarks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-lg text-gray-600">No exams scheduled.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default MyExams;
