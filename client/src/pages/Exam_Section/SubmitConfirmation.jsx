
import React from 'react';
import { useNavigate } from 'react-router-dom';

function SubmitConfirmation() {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/'); 
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-10 bg-white shadow-md rounded-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Exam Submitted Successfully</h1>
                <p className="text-lg mb-6">Thank you for completing the exam. Your responses have been submitted successfully.</p>
                <button
                    onClick={handleHome}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
}

export default SubmitConfirmation;
