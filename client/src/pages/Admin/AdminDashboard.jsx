import React, { useState, useEffect } from 'react';

function AdminDashboard() {
    const [showPopup, setShowPopup] = useState(false);
    const [examDetails, setExamDetails] = useState({
        examName: '',
        duration: '',
        eligibility: '',
        examDate: '',
        totalMarks: '',
        passingMarks: '',
    });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Load success message from local storage
        const storedMessage = localStorage.getItem('successMessage');
        if (storedMessage) {
            setSuccessMessage(storedMessage);
        }
    }, []);

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamDetails({ ...examDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/exams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(examDetails),
            });

            if (response.ok) {
                const message = `Exam "${examDetails.examName}" created successfully!`;
                setSuccessMessage(message);
                localStorage.setItem('successMessage', message);
                setShowPopup(false);
                setExamDetails({
                    examName: '',
                    duration: '',
                    eligibility: '',
                    examDate: '',
                    totalMarks: '',
                    passingMarks: '',
                });
            } else {
                alert('Failed to create exam.');
            }
        } catch (error) {
            console.error('Error creating exam:', error);
        }
    };

    const handleClearMessage = () => {
        setSuccessMessage('');
        localStorage.removeItem('successMessage');
    };

    return (
        <div className="admin-dashboard flex flex-col items-center justify-center h-screen space-y-4">
            {successMessage && (
                <div className="bg-green-100 text-green-800 border border-green-300 p-4 rounded-md mb-4 relative">
                    {successMessage}
                    <button
                        onClick={handleClearMessage}
                        className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                        aria-label="Clear message"
                    >
                        &times;
                    </button>
                </div>
            )}
            <button
                onClick={handleButtonClick}
                className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition-colors"
            >
                Create New Exam
            </button>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-2xl font-bold mb-4">Create New Exam</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col">
                                <label className="mb-1 font-semibold">Exam Name:</label>
                                <input
                                    type="text"
                                    name="examName"
                                    value={examDetails.examName}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 font-semibold">Duration:</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={examDetails.duration}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 font-semibold">Eligibility:</label>
                                <input
                                    type="text"
                                    name="eligibility"
                                    value={examDetails.eligibility}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 font-semibold">Exam Date:</label>
                                <input
                                    type="date"
                                    name="examDate"
                                    value={examDetails.examDate}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 font-semibold">Total Marks:</label>
                                <input
                                    type="number"
                                    name="totalMarks"
                                    value={examDetails.totalMarks}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 font-semibold">Passing Marks:</label>
                                <input
                                    type="number"
                                    name="passingMarks"
                                    value={examDetails.passingMarks}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                                    Create Exam
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowPopup(false)}
                                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
