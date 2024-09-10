import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExamCardDisplay = ({ exams }) => {
    const [selectedExam, setSelectedExam] = useState(null);
    const navigate = useNavigate();

    const handleApplyClick = (exam) => {
        setSelectedExam(exam);
    };

    const handleClosePopup = () => {
        if (selectedExam) {
            navigate('/registration-form', { state: { exam: selectedExam } });
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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

                return (
                    <div
                        key={index}
                        className="bg-white shadow-lg border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{examName}</h2>
                            <p className="text-gray-500">{examDateObj.toLocaleDateString()}</p>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Duration:</span>
                                <span>{duration} minutes</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Eligibility:</span>
                                <span>{eligibility}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Total Marks:</span>
                                <span>{totalMarks}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Passing Marks:</span>
                                <span>{passingMarks}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Time left for registration:</span>
                                <span>{timeLeft} days</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={() => handleApplyClick(exam)}
                                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                );
            })}

            {selectedExam && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
                        <h3 className="text-xl font-bold mb-4">Exam Details</h3>
                        <div className="space-y-2">
                            <p><strong>Exam Name:</strong> {selectedExam.examName}</p>
                            <p><strong>Duration:</strong> {selectedExam.duration} minutes</p>
                            <p><strong>Eligibility:</strong> {selectedExam.eligibility}</p>
                            <p><strong>Exam Date:</strong> {new Date(selectedExam.examDate).toLocaleDateString()}</p>
                            <p><strong>Total Marks:</strong> {selectedExam.totalMarks}</p>
                            <p><strong>Passing Marks:</strong> {selectedExam.passingMarks}</p>
                            <p><strong>Registration End Date:</strong> {new Date(selectedExam.registrationEndDate).toLocaleDateString()}</p>
                        </div>
                        <button
                            onClick={handleClosePopup}
                            className="bg-green-600 text-white font-semibold px-4 py-2 mt-4 rounded-lg hover:bg-green-700 transition-colors w-full"
                        >
                            Register
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamCardDisplay;
