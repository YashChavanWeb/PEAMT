import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


function ExamWindow() {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [responses, setResponses] = useState({});
    const [error, setError] = useState('');
    const [time, setTime] = useState({ hours: 1, minutes: 0, seconds: 0 });
    const timerRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            // Example demo data with 10 questions
            const demoQuestions = [
                { number: 0, text: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'] },
                { number: 1, text: 'What is 2 + 2?', options: ['3', '4', '5', '6'] },
                { number: 2, text: 'What is the largest planet in our solar system?', options: ['Earth', 'Jupiter', 'Mars', 'Saturn'] },
                { number: 3, text: 'Who wrote "To Kill a Mockingbird"?', options: ['Harper Lee', 'Mark Twain', 'J.K. Rowling', 'Ernest Hemingway'] },
                { number: 4, text: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Pb', 'Fe'] },
                { number: 5, text: 'Which element has the atomic number 1?', options: ['Hydrogen', 'Helium', 'Oxygen', 'Carbon'] },
                { number: 6, text: 'What is the largest ocean on Earth?', options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'] },
                { number: 7, text: 'Who painted the Mona Lisa?', options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Claude Monet'] },
                { number: 8, text: 'What year did the Titanic sink?', options: ['1912', '1905', '1898', '1923'] },
                { number: 9, text: 'What is the freezing point of water in Celsius?', options: ['0°C', '32°C', '100°C', '-10°C'] }
            ];
            setQuestions(demoQuestions);
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
    }, []);

    const handleQuestionSelect = (index) => {
        setSelectedQuestionIndex(index);
        setError('');
    };

    const handleSaveResponse = () => {
        const currentResponse = responses[selectedQuestionIndex];
        if (!currentResponse?.option) {
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
        const currentResponse = responses[selectedQuestionIndex];
        if (currentResponse?.option === option) {
            // Deselect if already selected
            setResponses({
                ...responses,
                [selectedQuestionIndex]: { ...currentResponse, option: null, status: 'skipped' }
            });
        } else {
            // Select new option
            setResponses({
                ...responses,
                [selectedQuestionIndex]: { option, status: 'selected' }
            });
        }
        setError('');
    };

    const handlePrevious = () => {
        setSelectedQuestionIndex(Math.max(selectedQuestionIndex - 1, 0));
        setError('');
    };

    const handleNext = () => {
        const currentResponse = responses[selectedQuestionIndex];
        if (!currentResponse?.option) {
            setResponses({
                ...responses,
                [selectedQuestionIndex]: { ...currentResponse, status: 'skipped' }
            });
        } else {
            setResponses({
                ...responses,
                [selectedQuestionIndex]: { ...currentResponse, status: 'saved' }
            });
        }
        setSelectedQuestionIndex(Math.min(selectedQuestionIndex + 1, questions.length - 1));
        setError('');
    };

    const handleReview = () => {
        setResponses({
            ...responses,
            [selectedQuestionIndex]: { ...responses[selectedQuestionIndex], status: 'review' }
        });
        setSelectedQuestionIndex(Math.min(selectedQuestionIndex + 1, questions.length - 1));
        setError('');
    };

    const handleSubmit = () => {
        // You can add submission logic here if needed
        navigate('/submit-confirmation');
    };

    const getButtonColor = (index) => {
        const response = responses[index];
        if (response?.status === 'saved') {
            return 'bg-green-500'; // Green if saved
        } else if (response?.status === 'skipped') {
            return 'bg-red-500'; // Red if skipped without selection
        } else if (response?.status === 'review') {
            return 'bg-orange-500'; // Orange if reviewed
        } else if (response?.status === 'selected') {
            return 'bg-blue-500'; // Blue if selected but not saved
        } else {
            return 'bg-blue-500'; // Default color
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
                    <h3 className="text-xl font-semibold mb-4">Questions</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {questions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuestionSelect(index)}
                                className={`px-4 py-2 rounded-lg text-white ${getButtonColor(index)} hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-3/4 p-2 relative" style={{ height: '100%', overflowY: 'auto' }}>
                <div className="absolute top-4 right-4 text-lg font-semibold">{formatTime(time)}</div>
                <div className="flex flex-col h-full p-0 bg-white rounded-lg shadow-md">
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
                    {error && <p className="text-red-500 ml-10 mb-3">{error}</p>}
                    <div className="flex justify-between mt-auto space-2 mb-4 ml-10 mr-10">
                        <button
                            onClick={handlePrevious}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Previous
                        </button>
                        {selectedQuestionIndex === questions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                Submit
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleReview}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
                                >
                                    Review
                                </button>
                                <button
                                    onClick={handleSaveResponse}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                >
                                    Save & Next
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >
                                    Next
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExamWindow;