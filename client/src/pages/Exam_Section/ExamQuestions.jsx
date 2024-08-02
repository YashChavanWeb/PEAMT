import React from 'react';

function ExamQuestions({ questions, onQuestionSelect, selectedIndex }) {
    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md h-full">
            <h3 className="text-xl font-semibold mb-4">Questions</h3>
            <div className="flex flex-wrap gap-2">
                {questions.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onQuestionSelect(index)}
                        className={`w-1/4 px-4 py-2 rounded-lg text-white ${selectedIndex === index ? 'bg-blue-600' : 'bg-blue-500'} hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ExamQuestions;
