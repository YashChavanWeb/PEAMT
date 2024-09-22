import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

function ExamWindow() {
    const [exams, setExams] = useState([]); // State for list of exams
    const [selectedExam, setSelectedExam] = useState(''); // State for selected exam
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [code, setCode] = useState(''); // State for 6-digit code
    const [codeValid, setCodeValid] = useState(false); // State to manage code validity
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({}); // State for storing selected answers
    const [warningCount, setWarningCount] = useState(0); // Count for tab switch warnings

    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch list of exams on component mount
    useEffect(() => {
        const fetchExams = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get('/api/exams');
                setExams(response.data);
            } catch (error) {
                console.error('Error fetching exams:', error);
                setError('Failed to load exams. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchExams();
    }, []);

    // Fetch exam questions when a selected exam changes
    useEffect(() => {
        if (!selectedExam || !codeValid) return;

        const fetchExamQuestions = async () => {
            setLoading(true);
            setError('');
            setQuestions([]); // Reset questions state when a new exam is selected
            setCurrentQuestionIndex(0); // Reset to first question
            try {
                const response = await axios.get('/api/examQuestions', { params: { examName: selectedExam } });
                const existingQuestions = response.data.questions || [];
                setQuestions(existingQuestions);
            } catch (error) {
                console.error('Error fetching exam questions:', error);
                setError('Failed to load exam questions. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchExamQuestions();
    }, [selectedExam, codeValid]);

    // Handle visibility change
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Increase warning count and handle actions
                setWarningCount(prevCount => {
                    const newCount = prevCount + 1;
                    if (newCount === 2) {
                        alert('Warning: Switching tabs multiple times may affect your exam.');
                    } else if (newCount >= 3) {
                        // Redirect to /submit-confirmation after 3 tab switches
                        navigate('/submit-confirmation');
                    }
                    return newCount;
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [navigate]);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
        if (e.target.value.length === 6) {
            // Validate code (you might want to replace this with actual validation logic)
            setCodeValid(true);
        } else {
            setCodeValid(false);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleOptionChange = (e) => {
        const questionId = questions[currentQuestionIndex].id;
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: e.target.value
        });
    };

    const handleSubmitExam = async () => {
        // Implement your exam submission logic here
        console.log('Exam submitted with answers:', selectedAnswers);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-6 bg-gray-100 h-screen">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">Select an Exam</h1>

                {/* Error handling */}
                {error && <p className="text-red-600 mb-4">{error}</p>}

                {/* Exam selection */}
                <div className="mb-4">
                    <label htmlFor="exam-select" className="block text-lg font-semibold text-gray-800 mb-2">
                        Choose Exam:
                    </label>
                    <select
                        id="exam-select"
                        value={selectedExam}
                        onChange={(e) => setSelectedExam(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg w-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Select an exam</option>
                        {exams.map(exam => (
                            <option key={exam._id} value={exam.examName}>
                                {exam.examName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Code input */}
                {selectedExam && (
                    <div className="mb-4">
                        <label htmlFor="code-input" className="block text-lg font-semibold text-gray-800 mb-2">
                            Enter 6-digit code:
                        </label>
                        <input
                            id="code-input"
                            type="text"
                            value={code}
                            onChange={handleCodeChange}
                            placeholder="Enter 6-digit code"
                            className="px-4 py-2 border border-gray-300 rounded-lg w-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {!codeValid && <p className="text-red-600 mt-2">Code must be 6 digits.</p>}
                    </div>
                )}

                {/* Display question */}
                {questions.length > 0 && codeValid && (
                    <div>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Question {currentQuestionIndex + 1}:</h2>
                            <p className="text-gray-700 mb-4">{questions[currentQuestionIndex].text}</p>
                            {questions[currentQuestionIndex].type === 'MCQ' ? (
                                <div className="space-y-2">
                                    {questions[currentQuestionIndex].options.map((option, index) => (
                                        <div key={index} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={`question-${questions[currentQuestionIndex].id}-option-${index}`}
                                                name={`question-${questions[currentQuestionIndex].id}`}
                                                value={option}
                                                checked={selectedAnswers[questions[currentQuestionIndex].id] === option}
                                                onChange={handleOptionChange}
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor={`question-${questions[currentQuestionIndex].id}-option-${index}`}
                                                className="text-gray-600"
                                            >
                                                {String.fromCharCode(65 + index)}. {option}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-700">{questions[currentQuestionIndex].answerText}</p>
                            )}
                            <div className="mt-2">
                                <p className="text-gray-600">Difficulty: {questions[currentQuestionIndex].difficulty}</p>
                                <p className="text-gray-600">Marks: {questions[currentQuestionIndex].marks}</p>
                            </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex justify-between">
                            <button
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextQuestion}
                                disabled={currentQuestionIndex === questions.length - 1}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Next
                            </button>
                        </div>

                        {/* Question count */}
                        <p className="mt-4 text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExamWindow;
