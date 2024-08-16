import React from 'react';
import '../../styles/pages/ExamCardDisplay.css'; // Import custom CSS for additional styles

const ExamCardDisplay = () => {
    // Predefined exam data
    const examData = {
        examName: 'JEE',
        duration: '180',
        eligibility: '12th',
        examDate: '2024-08-11T00:00:00.000+00:00',
        totalMarks: 180,
        passingMarks: 75,
        registrationEndDate: '2024-07-31T00:00:00.000+00:00', // Assuming a registration end date
    };

    const {
        examName,
        duration,
        eligibility,
        examDate,
        totalMarks,
        passingMarks,
        registrationEndDate,
    } = examData;

    const currentDate = new Date();
    const endDate = new Date(registrationEndDate);
    const examDateObj = new Date(examDate);

    // Calculate time left for registration
    const timeLeft = endDate - currentDate;
    const totalTime = endDate - new Date('2024-01-01T00:00:00.000+00:00'); // Arbitrary start date for full period
    const progress = (timeLeft / totalTime) * 100;

    // Format the exam date to a more readable format
    const formattedDate = examDateObj.toLocaleDateString();

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">{examName}</h2>
                <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-600">Duration:</span>
                    <span>{duration} minutes</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-600">Eligibility:</span>
                    <span>{eligibility}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-600">Exam Date:</span>
                    <span className="blinking">{formattedDate}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-600">Total Marks:</span>
                    <span>{totalMarks}</span>
                </div>
                <div className="flex justify-between mb-4">
                    <span className="font-medium text-gray-600">Passing Marks:</span>
                    <span>{passingMarks}</span>
                </div>

                {/* Progress Bar */}
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div className="text-xs font-medium text-gray-600">Time left for registration</div>
                        <div className="text-xs font-medium text-gray-600">{Math.max(Math.ceil(timeLeft / (1000 * 60 * 60 * 24)), 0)} days</div>
                    </div>
                    <div className="flex h-2 overflow-hidden rounded bg-gray-200">
                        <div
                            style={{ width: `${progress}%` }}
                            className="bg-green-500 transition-all duration-500 ease-in-out"
                        ></div>
                    </div>
                </div>

                {/* Apply Button */}
                <div className="mt-4">
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExamCardDisplay;
