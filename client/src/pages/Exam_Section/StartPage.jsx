// src/pages/Exam_section/StartPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Predefined code from environment variables
    const PREDEFINED_CODE = import.meta.env.VITE_EXAM_CODE; // Adjust if necessary

    const handleCodeChange = (e) => {
        setCode(e.target.value);
        // Clear the error when user starts typing
        if (error) {
            setError('');
        }
    };

    const handleStart = () => {
        if (code === PREDEFINED_CODE) {
            navigate('/exam-section'); // Adjust if the route for ExamWindow is different
        } else {
            setError('Incorrect code. Please try again.');
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4">Welcome to the Exam</h1>
                <p className="text-lg mb-6">Enter the code to start the exam.</p>

                {/* Exam Rules */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Exam Rules:</h2>
                    <ul className="list-disc list-inside mb-4">
                        <li>Maintain academic integrity throughout the exam.</li>
                        <li>Do not use any unauthorized materials or devices.</li>
                        <li>Follow all instructions carefully.</li>
                        <li>In case of any technical issues, contact support immediately.</li>
                    </ul>
                </div>

                {/* Code Input */}
                <input
                    type="text"
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="Enter 5-digit code"
                    className="px-4 py-2 border rounded-lg w-full mb-4"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    onClick={handleStart}
                    disabled={code.trim() === ''}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    Start Exam
                </button>
            </div>
        </div>
    );
}

export default StartPage;
