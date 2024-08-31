import React, { useState, useEffect } from 'react';

function AdminDashboard() {
    const [showPopup, setShowPopup] = useState(false);
    const [examDetails, setExamDetails] = useState({
        examName: '',
        duration: '',
        eligibility: '',
        examDate: '',
        registrationEndDate: '',
        totalMarks: '',
        passingMarks: '',
    });

    const [exams, setExams] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const response = await fetch('/api/exams'); // Adjust the endpoint as needed
            if (response.ok) {
                const data = await response.json();
                setExams(data);
            } else {
                console.error('Failed to fetch exams.');
            }
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    useEffect(() => {
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
                alert('Exam created successfully!');

                const message = `Exam "${examDetails.examName}" created successfully!`;
                setSuccessMessage(message);
                localStorage.setItem('successMessage', message);

                setShowPopup(false);
                setExamDetails({
                    examName: '',
                    duration: '',
                    eligibility: '',
                    examDate: '',
                    registrationEndDate: '',
                    totalMarks: '',
                    passingMarks: '',
                });

                fetchExams(); // Fetch the updated list of exams after successful creation
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
        <div className="admin-dashboard bg-gradient-to-r from-cyan-600 to-indigo-300 flex flex-col items-center justify-center h-screen p-4 overflow-x-hidden">
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
                className="button"
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
                                <label className="mb-1 font-semibold">Registration End Date:</label>
                                <input
                                    type="date"
                                    name="registrationEndDate"
                                    value={examDetails.registrationEndDate}
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
                                <button type="submit" className="button">
                                    Create Exam
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowPopup(false)}
                                    className="bg-red-600 w-40 shadow-lg text-white font-poppins p-3 rounded-3xl hover:bg-red-700 hover:shadow-red-800/50 hover:font-bold transition transform hover:-translate-y-1 hover:scale-105"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="w-full max-w-4xl mt-8 overflow-x-auto">
                {exams.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-200 text-gray-800">
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Exam Name</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Duration</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Eligibility</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Exam Date</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Registration End Date</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Total Marks</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Passing Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map((exam, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition-colors duration-300">
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{exam.examName}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{exam.duration}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{exam.eligibility}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{new Date(exam.examDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{new Date(exam.registrationEndDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{exam.totalMarks}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{exam.passingMarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 text-center">No exams available.</p>
                )}
            </div>

        </div>
    );
}

export default AdminDashboard;
