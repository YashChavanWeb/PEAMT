import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RegisteredUsers() {
    const [examName, setExamName] = useState('');
    const [users, setUsers] = useState([]); // Change to hold both usernames and emails
    const [error, setError] = useState('');

    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const examNameFromQuery = queryParams.get('examName');
        if (examNameFromQuery) {
            setExamName(examNameFromQuery);
            fetchUsers(examNameFromQuery); // Fetch users immediately if exam name is present
        }
    }, [location]);

    const fetchUsers = async (examNameToFetch) => {
        try {
            const response = await fetch(`/api/regform/usernames/exam/${examNameToFetch}`);
            if (!response.ok) {
                throw new Error('Users not found');
            }
            const data = await response.json();
            setUsers(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setUsers([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchUsers(examName);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Registered Users for Exam: {examName}
            </h1>
            <form onSubmit={handleSubmit} className="mb-6 flex justify-center">
                <input
                    type="text"
                    value={examName}
                    readOnly
                    className="border border-gray-300 rounded-l-md p-2 w-1/3 bg-gray-200 cursor-not-allowed"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-r-md p-2 hover:bg-blue-600 transition duration-200"
                >
                    Fetch Users
                </button>
            </form>
            {error && <p className="text-red-600 text-center">{error}</p>}
            {users.length > 0 && (
                <ul className="bg-white shadow-md rounded-md p-4">
                    {users.map((user, index) => (
                        <li key={index} className="py-2 border-b border-gray-200 text-gray-800">
                            <span className="font-semibold">{user.username}</span> - {user.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RegisteredUsers;
