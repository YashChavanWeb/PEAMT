import React from 'react';

function QuestionsDisplay({ question, selectedOption, onSave, onPrevious, onNext, onOptionChange }) {
    if (!question) {
        return (
            <div className="flex flex-col justify-center items-center p-4 bg-white rounded-lg shadow-md h-full">
                <p className="text-gray-500">Select a question to view details.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full  p-0 bg-white rounded-lg shadow-md">
            <h3 className=" ml-10  text-2xl font-semibold mb-4">Question {question.number + 1}</h3>
            <p className=" ml-10  text-lg mb-4">{question.text}</p>
            <div className="space-y-2 ml-10 mb-4">
                {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id={`option${index}`}
                            name="options"
                            value={option}
                            checked={selectedOption === option}
                            onChange={(e) => onOptionChange(e.target.value)}
                            className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor={`option${index}`} className="text-lg">{option}</label>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-auto">
                <button
                    onClick={onPrevious}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    Previous
                </button>
                <button
                    onClick={onSave}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                    Save & Next
                </button>
                <button
                    onClick={onNext}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default QuestionsDisplay;
