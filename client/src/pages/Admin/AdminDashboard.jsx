// src/components/FetchRegFormByAdhar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [adhar, setAdhar] = useState('');
    const [regForm, setRegForm] = useState(null);
    const [error, setError] = useState(null);
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

    const handleInputChange = (e) => {
        setAdhar(e.target.value);
    };

    const handleSubmitFetch = async (e) => {
        e.preventDefault();
        setError(null);
        setRegForm(null);

        try {
            const response = await axios.get(`/api/regform/adhar/${adhar}`);
            setRegForm(response.data);
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    useEffect(() => {
        // Load success message from local storage
        const storedMessage = localStorage.getItem('successMessage');
        if (storedMessage) {
            setSuccessMessage(storedMessage);
            // Clear the message after displaying
            localStorage.removeItem('successMessage');
        }
    }, []);

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
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
                const errorMessage = await response.text();
                setError(`Failed to create exam: ${errorMessage}`);
            }
        } catch (error) {
            setError('Error creating exam. Please try again later.');
            console.error('Error creating exam:', error);
        }
    };

    const handleClearMessage = () => {
        setSuccessMessage('');
        localStorage.removeItem('successMessage');
    };

    return (
        <>
            <div>
                <h1>Fetch Registration Form by Aadhar</h1>
                <form onSubmit={handleSubmitFetch}>
                    <label htmlFor="adhar">Aadhar Number:</label>
                    <input
                        type="text"
                        id="adhar"
                        value={adhar}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Fetch Details</button>
                </form>

                {error && <div style={{ color: 'red' }}>Error: {error}</div>}

                {regForm && (
                    <div>
                        <h2>Registration Form Details</h2>
                        <ul>
                            <li><strong>Name:</strong> {regForm.name}</li>
                            <li><strong>Aadhar:</strong> {regForm.adhar}</li>
                            <li><strong>Email:</strong> {regForm.email}</li>
                            <li><strong>Phone:</strong> {regForm.phone}</li>
                            <li><strong>Permanent Address:</strong>
                                <ul>
                                    <li><strong>Country:</strong> {regForm.permanentAddress.country}</li>
                                    <li><strong>State:</strong> {regForm.permanentAddress.state}</li>
                                    <li><strong>City:</strong> {regForm.permanentAddress.city}</li>
                                    <li><strong>Pincode:</strong> {regForm.permanentAddress.pincode}</li>
                                </ul>
                            </li>
                            <li><strong>Payment ID:</strong> {regForm.paymentId}</li>
                        </ul>
                    </div>
                )}
            </div>

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
        </>
    );
};

export default AdminDashboard;
