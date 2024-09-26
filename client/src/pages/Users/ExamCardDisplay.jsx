import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Gradient patterns for different cards
const gradientPatterns = [
    'bg-gradient-to-r from-purple-500 to-indigo-500',
    'bg-gradient-to-r from-orange-400 to-yellow-500',
    'bg-gradient-to-r from-teal-400 to-blue-500',
    'bg-gradient-to-r from-pink-500 to-purple-600',
    'bg-gradient-to-r from-green-400 to-blue-600',
    'bg-gradient-to-r from-red-400 to-yellow-600',
];

const ExamCardDisplay = ({ exams }) => {
    const [selectedExam, setSelectedExam] = useState(null);
    const [appliedExams, setAppliedExams] = useState([]); // State to track applied exams
    const navigate = useNavigate();

    // Fetch applied exams from the backend
    useEffect(() => {
        const fetchAppliedExams = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user')); // Fetch user from local storage
                if (user && user.username) {
                    const response = await fetch(`/api/username/${user.username}/exams`); // Fetch applied exams
                    if (response.ok) {
                        const data = await response.json();
                        setAppliedExams(data.appliedExams); // Store applied exams in state
                    } else {
                        console.error('Failed to fetch applied exams');
                    }
                } else {
                    console.error('User not found in local storage');
                }
            } catch (error) {
                console.error('Error fetching applied exams:', error);
            }
        };

        fetchAppliedExams();
    }, []); // Empty dependency array ensures this runs only once on component mount

    const handleApplyClick = (exam) => {
        setSelectedExam(exam);
    };

    const handleClosePopup = () => {
        if (selectedExam) {
            // Navigate to the registration form and pass the selected exam name as state
            navigate('/registration-form', { state: { exam: selectedExam.examName } });
        }
        setSelectedExam(null); // Close the popup
    };

    const handleCancelPopup = () => {
        setSelectedExam(null); // Close the popup
    };

    return (
        <div className="p-8">
            {/* Title bar with centered title */}
            <div className="flex justify-center mb-8">
                <div className="bg-[#6C48C5] text-center py-3 px-6 rounded-full shadow-md w-2/3">
                    <h1 className="text-2xl font-bold text-brown-600">Exams Overview</h1>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {exams.map((exam, index) => {
                    const {
                        examName,
                        duration,
                        eligibility,
                        examDate,
                        totalMarks,
                        passingMarks,
                        registrationEndDate,
                    } = exam;

                    const currentDate = new Date();
                    const endDate = new Date(registrationEndDate);
                    const examDateObj = new Date(examDate);
                    const timeLeft = Math.max(Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24)), 0);

                    // Apply a different gradient pattern to each card based on index
                    const cardGradient = gradientPatterns[index % gradientPatterns.length];

                    // Check if the exam is in the list of applied exams
                    const hasApplied = appliedExams.includes(examName);

                    return (
                        <div
                            key={index}
                            className={`${cardGradient} text-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-transform transform hover:scale-105`}
                        >
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold">{examName}</h2>
                                <p className="text-gray-200">{examDateObj.toLocaleDateString()}</p>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Duration:</span>
                                    <span className="font-bold">{duration} minutes</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Eligibility:</span>
                                    <span className="font-bold">{eligibility}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Total Marks:</span>
                                    <span className="font-bold">{totalMarks}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Passing Marks:</span>
                                    <span className="font-bold">{passingMarks}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Time left for registration:</span>
                                    <span className={`font-bold ${timeLeft <= 3 ? 'text-red-400' : 'text-white'}`}>{timeLeft} days</span>
                                </div>
                            </div>

                            <div className="text-center">
                                {/* Conditionally render the button or message based on applied status */}
                                {hasApplied ? (
                                    <span className="text-green-500 font-bold">You've applied for the exam</span>
                                ) : (
                                    <button
                                        onClick={() => handleApplyClick(exam)}
                                        className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition-all"
                                    >
                                        Apply Now
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}

                {selectedExam && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-2xl relative">
                            <button
                                onClick={handleCancelPopup}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <h3 className="text-2xl font-bold mb-6 text-center">Exam Details</h3>
                            <div className="space-y-4">
                                <p><strong>Exam Name:</strong> {selectedExam.examName}</p>
                                <p><strong>Duration:</strong> {selectedExam.duration} minutes</p>
                                <p><strong>Eligibility:</strong> {selectedExam.eligibility}</p>
                                <p><strong>Exam Date:</strong> {new Date(selectedExam.examDate).toLocaleDateString()}</p>
                                <p><strong>Total Marks:</strong> {selectedExam.totalMarks}</p>
                                <p><strong>Passing Marks:</strong> {selectedExam.passingMarks}</p>
                            </div>
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={handleClosePopup}
                                    className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
                                >
                                    Proceed to Registration
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExamCardDisplay;
