import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ExamWindow() {
    const location = useLocation();
    const { examName } = location.state || { examName: 'defaultExam' }; // Get the exam name from state
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [responses, setResponses] = useState({});
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

                // Check if questions exist
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
                    return prevTime;
                }
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [examName]); // Dependency added

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

    const handlePrevious = () => {
        setSelectedQuestionIndex(Math.max(selectedQuestionIndex - 1, 0));
        setError('');
    };

    const handleNext = () => {
        handleSaveResponse();
    };

    const handleSubmit = () => {
        // Submit logic can go here
        navigate('/submit-confirmation');
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
                    <h3 className="text-xl font-semibold mb-4">Questions</h3>
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="grid grid-cols-3 gap-2">
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuestionSelect(index)}
                                    className={`px-4 py-2 rounded-lg text-white ${responses[index]?.status === 'saved' ? 'bg-green-500' : 'bg-blue-500'} hover:bg-opacity-75`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-3/4 p-2 relative" style={{ height: '100%', overflowY: 'auto' }}>
                <div className="absolute top-4 right-4 text-lg font-semibold">{formatTime(time)}</div>
                <div className="flex flex-col h-full p-0 bg-white rounded-lg shadow-md">
                    {error ? (
                        <p className="text-red-500 ml-10 mb-3">{error}</p>
                    ) : (
                        <>
                            <h3 className="ml-10 text-2xl font-semibold mb-4">Question {currentQuestion?.number + 1}</h3>
                            <p className="ml-10 text-lg mb-4">{currentQuestion?.text}</p>
                            <div className="space-y-2 ml-10 mb-4">
                                {currentQuestion?.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id={`option${index}`}
                                            name="options"
                                            value={option}
                                            checked={selectedOption === option}
                                            onChange={() => handleOptionChange(option)}
                                            className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label htmlFor={`option${index}`} className="text-lg">{option}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-auto space-2 mb-4 ml-10 mr-10">
                                <button
                                    onClick={handlePrevious}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                >
                                    Previous
                                </button>
                                {selectedQuestionIndex === questions.length - 1 ? (
                                    <button
                                        onClick={handleSubmit}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Submit
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                    >
                                        Save & Next
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ExamWindow;
