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
                const formattedData = data.map((exam) => ({
                    ...exam,
                    examDate: new Date(exam.examDate).toLocaleDateString(),
                    registrationEndDate: new Date(exam.registrationEndDate).toLocaleDateString(),
                }));
                setExams(formattedData);
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
                <div className="bg-green-100 text-green-800 border border-green-300 p-4 rounded-md mb-4 relative shadow-lg">
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
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
                Create New Exam
            </button>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
                        <h2 className="text-2xl font-bold mb-4 text-center">Create New Exam</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col">
                                <label className="mb-1 font-semibold">Exam Name:</label>
                                <input
                                    type="text"
                                    name="examName"
                                    value={examDetails.examName}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
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
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
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
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
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
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
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
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
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
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
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
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button type="submit" className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-transform transform hover:scale-105">
                                    Create Exam
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowPopup(false)}
                                    className="bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl transition-transform transform hover:scale-105"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="w-full max-w-5xl mt-8 overflow-x-auto">
                {exams.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="px-6 py-4 border-b-2 border-indigo-500 text-left text-md font-semibold">Exam Name</th>
                                <th className="px-6 py-4 border-b-2 border-indigo-500 text-left text-md font-semibold">Duration</th>
                                <th className="px-6 py-4 border-b-2 border-indigo-500 text-left text-md font-semibold">Eligibility</th>
                                <th className="px-6 py-4 border-b-2 border-indigo-500 text-left text-md font-semibold">Exam Date</th>
                                <th className="px-6 py-4 border-b-2 border-indigo-500 text-left text-md font-semibold">Registration End Date</th>
                                <th className="px-6 py-4 border-b-2 border-indigo-500 text-left text-md font-semibold">Total Marks</th>
                                <th className="px-6 py-4 border-b-2 border-indigo-500 text-left text-md font-semibold">Passing Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map((exam, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition-colors duration-300">
                                    <td className="px-6 py-4 border-b border-gray-300">{exam.examName}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{exam.duration}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{exam.eligibility}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{exam.examDate}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{exam.registrationEndDate}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{exam.totalMarks}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{exam.passingMarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-600">No exams available yet.</p>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
