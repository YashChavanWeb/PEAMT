import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate(`/exam-window`); // Navigate to ExamWindow component
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
            <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md border border-gray-200">
                <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to the Exam</h1>
                <p className="text-lg text-gray-700 mb-6">Please review the rules below before starting.</p>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Exam Rules:</h2>
                    <ul className="list-disc list-inside mb-4 text-gray-600 space-y-2">
                        <li>Maintain academic integrity throughout the exam.</li>
                        <li>Do not use any unauthorized materials or devices.</li>
                        <li>Follow all instructions provided in the exam carefully.</li>
                        <li>Ensure that you have a stable internet connection.</li>
                        <li>Complete the exam within the allotted time.</li>
                        <li>Do not leave the exam page once you have started.</li>
                        <li>Contact support immediately if you encounter any issues.</li>
                        <li>Make sure to save your answers regularly.</li>
                        <li>Do not refresh or close the browser during the exam.</li>
                        <li>Review your answers before submitting the exam.</li>
                    </ul>
                </div>

                <button
                    onClick={handleStart}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Start Exam
                </button>
            </div>
        </div>
    );
}

export default StartPage;
