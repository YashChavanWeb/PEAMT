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
            const response = await fetch('/api/exams');
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
                alert(`Exam "${examDetails.examName}" created successfully!`);
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

                fetchExams(); // Re-fetch the exams to show the newly created one.
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
        <div 
            className="admin-dashboard min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden"
            style={{
                backgroundImage: 'url("https://i.pinimg.com/236x/51/eb/6c/51eb6c48ffd090c8df792d55928c0f3d.jpg")', // Replace with your image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {successMessage && (
                <div className="bg-green-50 text-green-700 border border-green-400 p-4 rounded-lg mb-4 relative shadow-md transition-all duration-300">
                    {successMessage}
                    <button
                        onClick={handleClearMessage}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        aria-label="Clear message"
                    >
                        &times;
                    </button>
                </div>
            )}

            <button
                onClick={handleButtonClick}
                style={{
                    background: 'linear-gradient(to right, #3b82f6, #14b8a6)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '12px',
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
                            boxShadow: 'none', // Removed shadow from outer border
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
                            {Object.keys(examDetails).map((key) => (
                                <div key={key} style={{ marginBottom: '16px' }}>
                                    <label
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
                            ))}
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
                    </div>
                </div>
            )}

            {/* Display All Exams */}
            <div className="w-full max-w-4xl mt-8 overflow-x-auto">
                {exams.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm table-auto">
                        <thead className="bg-[#50B498] text-white">
                            <tr>
                                {['Exam Name', 'Duration', 'Eligibility', 'Exam Date', 'Registration End Date', 'Total Marks', 'Passing Marks'].map((header) => (
                                    <th key={header} className="px-4 py-3 text-left text-sm font-semibold">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody style={{ color: '#6D4C41' }}> {/* Brown color */}
                            {exams.map((exam, index) => (
                                <tr
                                    key={index}
                                    className={`border-b hover:bg-gray-100 transition-colors ${
                                        index % 2 === 0 ? 'bg-gray-50' : ''
                                    }`}
                                >
                                    <td className="px-4 py-3">{exam.examName}</td>
                                    <td className="px-4 py-3">{exam.duration}</td>
                                    <td className="px-4 py-3">{exam.eligibility}</td>
                                    <td className="px-4 py-3">{exam.examDate}</td>
                                    <td className="px-4 py-3">{exam.registrationEndDate}</td>
                                    <td className="px-4 py-3">{exam.totalMarks}</td>
                                    <td className="px-4 py-3">{exam.passingMarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 mt-4">No exams available.</p>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;