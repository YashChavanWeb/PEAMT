import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const response = await fetch('/api/exams');
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
                body: JSON.stringify({
                    ...examDetails,
                    adminEmail: currentUser?.email
                }),
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

                fetchExams();
            } else {
                alert('Failed to create exam.');
            }
        } catch (error) {
            console.error('Error creating exam:', error);
        }
    };

    const adminExams = exams.filter(exam => exam.adminEmail === currentUser?.email);

    return (
        <div className="admin-dashboard bg-white flex flex-col items-center justify-center h-screen p-4 overflow-x-hidden"
        style={{
            backgroundImage: 'url("https://i.pinimg.com/236x/b5/69/85/b5698579540881089e74f9e994ba8885.jpg")', // Replace with your image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >

            
            {/* <div className="w-full max-w-4xl mb-8">
                <p className="text-lg font-semibold text-gray-800">
                    Signed in as: <span className="font-bold">{currentUser?.email}</span>
                </p>
            </div> */}

            <button
                onClick={handleButtonClick}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gradient-to-l"
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

