// src/pages/Exam_section/StartPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
    const [code, setCode] = useState('');
    const [isCodeValid, setIsCodeValid] = useState(false);
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
            setIsCodeValid(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100   ">
            <div className="p-10 bg-white shadow-md rounded-lg ">
                <h1 className="text-3xl font-bold mb-4">Welcome to the Exam</h1>
                <p className="text-lg mb-6">Enter the code to start the exam.</p>
                <input
                    type="text"
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="Enter code"
                    className="px-4 py-2 border rounded-lg w-full mb-4"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    onClick={handleStart}
                    disabled={code.trim() === ''}
                    className={`px-6 py-3 ${code === PREDEFINED_CODE ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded-lg hover:${code === PREDEFINED_CODE ? 'bg-blue-600' : 'bg-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-300`}
                >
                    Start Exam
                </button>
            </div>
        </div>
    );
}

export default StartPage;
