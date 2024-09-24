import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ExamWindow() {
    const [exams, setExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [secureCode, setSecureCode] = useState('');
    const [codeValid, setCodeValid] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [warningCount, setWarningCount] = useState(0);
    const [isValidatingCode, setIsValidatingCode] = useState(false);
    const navigate = useNavigate();

    // Fetch exams when component mounts
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

    // Fetch questions after exam is selected and code is validated
    useEffect(() => {
        if (!selectedExam || !codeValid) return;

        const fetchExamQuestions = async () => {
            setLoading(true);
            setError('');
            setQuestions([]);
            setCurrentQuestionIndex(0);
            try {
                const response = await axios.get('/api/examQuestions', { params: { examName: selectedExam } });
                setQuestions(response.data.questions || []);
            } catch (error) {
                console.error('Error fetching exam questions:', error);
                setError('Failed to load exam questions. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchExamQuestions();
    }, [selectedExam, codeValid]);

    // Handle tab switch warnings
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setWarningCount((prevCount) => {
                    const newCount = prevCount + 1;
                    if (newCount === 2) {
                        alert('Warning: Switching tabs multiple times may affect your exam.');
                    } else if (newCount >= 3) {
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

    // Handle code input change
    const handleCodeChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,6}$/.test(value)) {
            setSecureCode(value);
            setCodeValid(false); // Reset code validity when input changes
        }
    };

    // Validate the secure code
    // Validate the secure code
const validateCode = async () => {
    setIsValidatingCode(true);
    try {
        const response = await axios.post('http://localhost:3000/api/exams/verify-code', {
            examName: selectedExam,
            enteredCode: secureCode,
        });
        if (response.data.valid) {
            setCodeValid(true);
            setError('');
            navigate('/exam-builder'); // Navigate to the exam builder page
        } else {
            setCodeValid(false);
            setError('Invalid secure code. Please try again.');
        }
    } catch (error) {
        console.error('Error validating secure code:', error);
        setError('Failed to validate secure code. Please try again later.');
    } finally {
        setIsValidatingCode(false);
    }
};

    

    // Handle navigation between questions
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

    // Handle option change for answers
    const handleOptionChange = (e) => {
        const questionId = questions[currentQuestionIndex].id;
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: e.target.value,
        });
    };

    // Handle exam submission
    const handleSubmitExam = async () => {
        try {
            const response = await axios.post('/api/submitExam', {
                examName: selectedExam,
                answers: selectedAnswers,
            });

            if (response.data.success) {
                navigate('/exam-submitted')
            } else {
                setError(response.data.message || 'Failed to submit exam.');
            }
        } catch (error) {
            console.error('Error submitting exam:', error);
            setError('Failed to submit exam. Please try again later.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">Start Your Exam</h1>
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="exam-select" className="block text-lg font-semibold text-gray-800 mb-2">
                        Choose Exam:
                    </label>
                    <select
                        id="exam-select"
                        value={selectedExam}
                        onChange={(e) => {
                            setSelectedExam(e.target.value);
                            setSecureCode('');
                            setCodeValid(false);
                            setQuestions([]);
                            setSelectedAnswers({});
                            setError('');
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg w-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="" disabled>Select an exam</option>
                        {exams.map(exam => (
                            <option key={exam._id} value={exam.examName}>
                                {exam.examName}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedExam && (
                    <div className="mb-4">
                        <label htmlFor="code-input" className="block text-lg font-semibold text-gray-800 mb-2">
                            Enter 6-digit code:
                        </label>
                        <input
                            id="code-input"
                            type="text"
                            value={secureCode}
                            onChange={handleCodeChange}
                            placeholder="Enter 6-digit code"
                            maxLength="6"
                            className="px-4 py-2 border border-gray-300 rounded-lg w-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {!codeValid && secureCode.length === 6 && <p className="text-red-600 mt-2">Invalid code. Please try again.</p>}
                        {isValidatingCode && <p className="text-blue-600 mt-2">Validating code...</p>}
                        <button
                            onClick={validateCode}
                            disabled={secureCode.length !== 6}
                            className={`mt-4 px-4 py-2 ${secureCode.length === 6 ? 'bg-blue-600 text-white' : 'bg-gray-400 text-gray-700'} rounded-lg`}
                        >
                            Validate Code
                        </button>
                    </div>
                )}

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
                                                id={`option-${index}`}
                                                name={`question-${questions[currentQuestionIndex].id}`}
                                                value={option}
                                                checked={selectedAnswers[questions[currentQuestionIndex].id] === option}
                                                onChange={handleOptionChange}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`option-${index}`} className="text-gray-700">{option}</label>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <textarea
                                    value={selectedAnswers[questions[currentQuestionIndex].id] || ''}
                                    onChange={handleOptionChange}
                                    className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your answer here..."
                                />
                            )}
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:bg-gray-300"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextQuestion}
                                disabled={!selectedAnswers[questions[currentQuestionIndex]?.id]}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                Next
                            </button>
                        </div>

                        {currentQuestionIndex === questions.length - 1 && (
                            <button
                                onClick={handleSubmitExam}
                                className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg w-full"
                            >
                                Submit Exam
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExamWindow;
