// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
        secureCode: '', // New field for the 6-digit code
    });

    const [exams, setExams] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [remainingExams, setRemainingExams] = useState(3); // Default limit

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchExams();
        fetchRemainingExams(); // Fetch remaining exams on component mount
    }, []);

    const fetchExams = async () => {
        try {
            const response = await fetch('/api/exams', {
                headers: {
                    'Content-Type': 'application/json',
                    // Include authorization headers if required
                },
            });
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

    const fetchRemainingExams = async () => {
        try {
            const response = await fetch('/api/exams', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                const startOfMonth = new Date();
                startOfMonth.setDate(1);
                startOfMonth.setHours(0, 0, 0, 0);

                const endOfMonth = new Date();
                endOfMonth.setMonth(endOfMonth.getMonth() + 1);
                endOfMonth.setDate(0);
                endOfMonth.setHours(23, 59, 59, 999);

                const count = data.filter(exam => {
                    const createdAt = new Date(exam.createdAt);
                    return exam.adminEmail === currentUser?.email &&
                        createdAt >= startOfMonth &&
                        createdAt <= endOfMonth;
                }).length;

                setRemainingExams(3 - count); // Update remaining exams count
            } else {
                console.error('Failed to fetch exams.');
            }
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamDetails({ ...examDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that secureCode is exactly 6 digits
        const secureCodeRegex = /^\d{6}$/;
        if (!secureCodeRegex.test(examDetails.secureCode)) {
            setErrorMessage('Secure Code must be exactly 6 digits.');
            return;
        }

        try {
            const response = await fetch('/api/exams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    examName: examDetails.examName,
                    duration: examDetails.duration,
                    eligibility: examDetails.eligibility,
                    examDate: examDetails.examDate,
                    registrationEndDate: examDetails.registrationEndDate,
                    totalMarks: examDetails.totalMarks,
                    passingMarks: examDetails.passingMarks,
                    secureCode: examDetails.secureCode, // Include secureCode
                    adminEmail: currentUser?.email,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                const message = `Exam "${examDetails.examName}" created successfully!`;
                alert(message);
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
                    secureCode: '', // Reset secureCode
                });

                fetchExams();
                fetchRemainingExams(); // Update remaining exams count
            } else {
                setErrorMessage(result.message || 'Failed to create exam.');
                console.error(result.message || 'Failed to create exam.');
            }
        } catch (error) {
            setErrorMessage('Error creating exam.');
            console.error('Error creating exam:', error);
        }
    };

    const handleQuestionListClick = (examId) => {
        navigate(`/exam-builder?examId=${examId}`); // Redirect to the exam-builder route with examId
    };

    const adminExams = exams.filter(exam => exam.adminEmail === currentUser?.email);

    return (
        <div className="admin-dashboard bg-white flex flex-col items-center justify-start h-screen p-4 overflow-x-hidden"
            style={{
                backgroundImage: 'url("https://i.pinimg.com/236x/b5/69/85/b5698579540881089e74f9e994ba8885.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingTop: '1rem' // Adjusted to reduce top space
            }}
        >
            <div className="mb-4">
                <p className="text-lg font-semibold">Remaining exams this month: {remainingExams}</p>
            </div>

            <button
                onClick={handleButtonClick}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gradient-to-l"
                disabled={remainingExams <= 0} // Disable button if no remaining exams
            >
                Create New Exam
            </button>
            {showPopup && (
                <div
                    style={{
                        position: 'fixed',
                        inset: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        zIndex: '10',
                    }}
                >
                    <div
                        style={{
                            padding: '24px',
                            borderRadius: '16px',
                            boxShadow: 'none',
                            backgroundColor: '#e0e0e0',
                            maxWidth: '600px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                        }}
                    >
                        <h2 style={{ textAlign: 'center', fontSize: '24px', color: '#555', marginBottom: '16px' }}>
                            Create New Exam
                        </h2>
                        <form onSubmit={handleSubmit}>
                            {Object.keys(examDetails).map((key) => {
                                if (key === 'secureCode') {
                                    return (
                                        <div key={key} style={{ marginBottom: '16px' }}>
                                            <label
                                                htmlFor={key}
                                                style={{
                                                    display: 'block',
                                                    marginBottom: '8px',
                                                    color: '#666',
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                                            </label>
                                            <input
                                                id={key}
                                                type="text"
                                                name={key}
                                                value={examDetails[key]}
                                                onChange={handleChange}
                                                placeholder="Enter 6-digit code"
                                                maxLength="6"
                                                pattern="\d{6}"
                                                title="6-digit numeric code"
                                                style={{
                                                    padding: '12px',
                                                    borderRadius: '8px',
                                                    backgroundColor: '#fff',
                                                    boxShadow: '6px 6px 12px #bebebe, -6px -6px 12px #ffffff',
                                                    border: '1px solid #ccc',
                                                    outline: 'none',
                                                    width: '100%',
                                                    transition: 'box-shadow 0.3s ease, border 0.3s ease',
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.boxShadow = '4px 4px 8px #bebebe, -4px -4px 8px #ffffff';
                                                    e.target.style.border = '1px solid #888';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.boxShadow = '6px 6px 12px #bebebe, -6px -6px 12px #ffffff';
                                                    e.target.style.border = '1px solid #ccc';
                                                }}
                                                required
                                            />
                                        </div>
                                    );
                                }

                                return (
                                    <div key={key} style={{ marginBottom: '16px' }}>
                                        <label
                                            htmlFor={key}
                                            style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                color: '#666',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                                        </label>
                                        <input
                                            id={key}
                                            type={key.includes('Date') ? 'date' : key.includes('Marks') ? 'number' : 'text'}
                                            name={key}
                                            value={examDetails[key]}
                                            onChange={handleChange}
                                            style={{
                                                padding: '12px',
                                                borderRadius: '8px',
                                                backgroundColor: '#e0e0e0',
                                                boxShadow: '6px 6px 12px #bebebe, -6px -6px 12px #ffffff',
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                transition: 'box-shadow 0.3s ease',
                                            }}
                                            onFocus={(e) => (e.target.style.boxShadow = '4px 4px 8px #bebebe, -4px -4px 8px #ffffff')}
                                            onBlur={(e) => (e.target.style.boxShadow = '6px 6px 12px #bebebe, -6px -6px 12px #ffffff')}
                                            required
                                        />
                                    </div>
                                );
                            })}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                                <button
                                    type="submit"
                                    style={{
                                        background: '#14b8a6',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        boxShadow: '6px 6px 12px #bebebe, -6px -6px 12px #ffffff',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'scale(1.05)';
                                        e.target.style.boxShadow = '4px 4px 8px #bebebe, -4px -4px 8px #ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'scale(1)';
                                        e.target.style.boxShadow = '6px 6px 12px #bebebe, -6px -6px 12px #ffffff';
                                    }}
                                >
                                    Create Exam
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowPopup(false)}
                                    style={{
                                        background: '#f87171',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        boxShadow: '6px 6px 12px #bebebe, -6px -6px 12px #ffffff',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'scale(1.05)';
                                        e.target.style.boxShadow = '4px 4px 8px #bebebe, -4px -4px 8px #ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'scale(1)';
                                        e.target.style.boxShadow = '6px 6px 12px #bebebe, -6px -6px 12px #ffffff';
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                        {errorMessage && <p style={{ color: 'red', textAlign: 'center', marginTop: '16px' }}>{errorMessage}</p>}
                    </div>
                </div>
            )}

            <div className="w-full max-w-4xl mt-8 overflow-x-auto">
                {adminExams.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Exam Name</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Duration</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Eligibility</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Exam Date</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Registration End Date</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Total Marks</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Passing Marks</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium">Actions</th> {/* New column */}
                            </tr>
                        </thead>
                        <tbody>
                            {adminExams.map((exam, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition-colors duration-300">
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{exam.examName}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{exam.duration}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{exam.eligibility}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{new Date(exam.examDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{new Date(exam.registrationEndDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{exam.totalMarks}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{exam.passingMarks}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">
                                        <button
                                            onClick={() => handleQuestionListClick(exam._id)} // Pass exam ID
                                            className="bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-600"
                                        >
                                            Question List
                                        </button>
                                    </td> {/* New cell */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-white text-center">No exams available.</p>
                )}
            </div>
        </div>
    );

}

export default AdminDashboard;
