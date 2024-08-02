import React, { useState, useEffect } from 'react';
import ExamQuestions from './ExamQuestions';
import QuestionsDisplay from './QuestionsDisplay';

function ExamWindow() {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [responses, setResponses] = useState({});

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
    }, []);

    const handleQuestionSelect = (index) => {
        setSelectedQuestionIndex(index);
    };

    const handleSaveResponse = (selectedOption) => {
        setResponses({
            ...responses,
            [selectedQuestionIndex]: selectedOption
        });
    };

    const handlePrevious = () => {
        setSelectedQuestionIndex(Math.max(selectedQuestionIndex - 1, 0));
    };

    const handleNext = () => {
        setSelectedQuestionIndex(Math.min(selectedQuestionIndex + 1, questions.length - 1));
    };

    const currentQuestion = questions[selectedQuestionIndex];
    const selectedOption = responses[selectedQuestionIndex];

    return (
        <div className="flex h-screen mt-10">
            <div className="w-1/4 p-4 bg-gray-100">
                <ExamQuestions
                    questions={questions}
                    onQuestionSelect={handleQuestionSelect}
                    selectedIndex={selectedQuestionIndex}
                />
            </div>
            <div className="w-3/4 p-4">
                <QuestionsDisplay
                    question={currentQuestion}
                    selectedOption={selectedOption}
                    onSave={() => handleSaveResponse(selectedOption)}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onOptionChange={(option) => setResponses({ ...responses, [selectedQuestionIndex]: option })}
                />
            </div>
        </div>
    );
}

export default ExamWindow;
