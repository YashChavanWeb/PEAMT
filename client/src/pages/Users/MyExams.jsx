import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'; // Importing useSelector to access user data
import { useNavigate, useLocation } from 'react-router-dom';

function ExamWindow() {
    const location = useLocation();
    const { examName } = location.state || { examName: 'defaultExam' };
    const { currentUser } = useSelector((state) => state.user); // Accessing currentUser from Redux
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [responses, setResponses] = useState({});
    const [markedForReview, setMarkedForReview] = useState({});
    const [error, setError] = useState('');
    const [time, setTime] = useState({ hours: 1, minutes: 0, seconds: 0 });
    const timerRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/examQuestions?examName=${encodeURIComponent(examName)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                const data = await response.json();
                if (data.questions && data.questions.length > 0) {
                    setQuestions(data.questions);
                } else {
                    setError(`No questions available for the exam: ${examName}.`);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
                setError('Could not load questions. Please try again later.');
            }
        };

        fetchData();

        timerRef.current = setInterval(() => {
            setTime((prevTime) => {
                const { hours, minutes, seconds } = prevTime;
                if (seconds > 0) {
                    return { ...prevTime, seconds: seconds - 1 };
                } else if (minutes > 0) {
                    return { hours, minutes: minutes - 1, seconds: 59 };
                } else if (hours > 0) {
                    return { hours: hours - 1, minutes: 59, seconds: 59 };
                } else {
                    clearInterval(timerRef.current);
                    handleSubmit(); // Auto-submit when time runs out
                    return prevTime;
                }
            });
        }, 1000);

        const handleKeyLock = (event) => {
            if (
                event.key === "Escape" ||
                event.key === "F5" ||
                (event.ctrlKey && event.key === "r")
            ) {
                event.preventDefault();
                alert("Navigation is disabled during the exam. Please stay on this page.");
            }
        };

        window.addEventListener("keydown", handleKeyLock);

        return () => {
            clearInterval(timerRef.current);
            window.removeEventListener("keydown", handleKeyLock);
        };
    }, [examName]);

    const handleQuestionSelect = (index) => {
        setSelectedQuestionIndex(index);
        setError('');
    };

    const handleSaveResponse = () => {
        const currentResponse = responses[selectedQuestionIndex] || {};
        if (!currentResponse.option) {
            setError('Please select an option before proceeding.');
            return;
        }
        setResponses({
            ...responses,
            [selectedQuestionIndex]: { ...currentResponse, status: 'saved' }
        });
        setSelectedQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
        setError('');
    };

    const handleOptionChange = (option) => {
        const currentResponse = responses[selectedQuestionIndex] || {};
        setResponses({
            ...responses,
            [selectedQuestionIndex]: { option, status: option ? 'selected' : 'skipped' }
        });
        setError('');
    };

    const handleMarkForReview = () => {
        const currentResponse = responses[selectedQuestionIndex] || {};
        setMarkedForReview({
            ...markedForReview,
            [selectedQuestionIndex]: true
        });
        if (!currentResponse.option) {
            setResponses({
                ...responses,
                [selectedQuestionIndex]: { ...currentResponse, status: 'skipped' }
            });
        }
        setSelectedQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
        setError('');
    };

    const handlePrevious = () => {
        setSelectedQuestionIndex(Math.max(selectedQuestionIndex - 1, 0));
        setError('');
    };

    const handleNext = () => {
        const currentResponse = responses[selectedQuestionIndex] || {};
        if (currentResponse.option) {
            setResponses({
                ...responses,
                [selectedQuestionIndex]: { ...currentResponse, status: 'saved' }
            });
        } else {
            setResponses({
                ...responses,
                [selectedQuestionIndex]: { ...currentResponse, status: 'skipped' }
            });
        }
        setSelectedQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
        setError('');
    };

    const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

    const handleSubmit = () => {
        setShowConfirmSubmit(true);
    };

    const confirmSubmit = async () => {
        const resultData = {
            userId: currentUser.id, // Use the user ID from the Redux state
            examName: examName, // Use the actual exam name
            responses: responses, // Use the actual responses from the user
        };

        try {
            const response = await fetch('http://localhost:3000/api/submitResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resultData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit results');
            }

            const data = await response.json();
            console.log('Result submitted successfully:', data);
            navigate('/results'); // Redirect after successful submission
        } catch (error) {
            console.error('Error submitting results:', error);
        }
    };

    const formatTime = (time) => {
        const { hours, minutes, seconds } = time;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const currentQuestion = questions[selectedQuestionIndex];
    const selectedOption = responses[selectedQuestionIndex]?.option;

    return (
        <div className="flex mt-10 p-10" style={{ height: '80vh' }}>
            <div className="w-1/6 p-2 bg-gray-100" style={{ height: '100%', overflowY: 'auto' }}>
                <div className="bg-gray-200 p-4 rounded-lg shadow-md h-full">
                    <h3 className="text-lg font-bold">Questions</h3>
                    {questions.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleQuestionSelect(index)}
                            className={`w-full py-2 text-left ${selectedQuestionIndex === index ? 'bg-blue-500 text-white' : 'bg-white'}`}
                        >
                            Question {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-5/6 p-4">
                <h2 className="text-2xl font-bold">{examName}</h2>
                <div className="mt-4">
                    {error && <p className="text-red-600">{error}</p>}
                    {currentQuestion ? (
                        <div>
                            <h3 className="text-lg font-semibold">{currentQuestion.questionText}</h3>
                            <div className="mt-2">
                                {currentQuestion.options.map((option, index) => (
                                    <label key={index} className="block">
                                        <input
                                            type="radio"
                                            name="option"
                                            checked={selectedOption === option}
                                            onChange={() => handleOptionChange(option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>No question selected.</p>
                    )}
                </div>
                <div className="mt-4">
                    <button onClick={handlePrevious} disabled={selectedQuestionIndex === 0} className="bg-gray-300 text-gray-600 p-2 rounded">
                        Previous
                    </button>
                    <button onClick={handleNext} className="bg-blue-500 text-white p-2 rounded ml-2">
                        Next
                    </button>
                    <button onClick={handleSaveResponse} className="bg-green-500 text-white p-2 rounded ml-2">
                        Save Response
                    </button>
                    <button onClick={handleMarkForReview} className="bg-yellow-500 text-white p-2 rounded ml-2">
                        Mark for Review
                    </button>
                    <button onClick={handleSubmit} className="bg-red-500 text-white p-2 rounded ml-2">
                        Submit
                    </button>
                </div>
                <div className="mt-4">
                    <p>Time Left: {formatTime(time)}</p>
                </div>
                {showConfirmSubmit && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-4 rounded shadow-md">
                            <h4 className="text-lg font-bold">Confirm Submission</h4>
                            <p>Are you sure you want to submit your exam?</p>
                            <button onClick={confirmSubmit} className="bg-blue-500 text-white p-2 rounded mt-2">Yes, Submit</button>
                            <button onClick={() => setShowConfirmSubmit(false)} className="bg-gray-300 text-gray-600 p-2 rounded mt-2 ml-2">Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExamWindow;
