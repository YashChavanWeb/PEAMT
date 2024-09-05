// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import CustomRadioButton from './CustomRadioButton';

function ExamBuilder() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1, // Unique ID for each question
      text: '',
      type: 'MCQ', // Default type
      options: ['', '', '', ''], // Default options
      correctAnswer: null, // To be set later if MCQ
      marks: 0, // Default 
      difficulty: 'Medium', // Default 
    };

    setQuestions([...questions, newQuestion]);
  };

  const updateQuestionText = (id, text) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id ? { ...question, text } : question
    );
    setQuestions(updatedQuestions);
  };

  const updateOptionText = (questionId, optionIndex, optionText) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const updatedOptions = question.options.map((option, index) =>
          index === optionIndex ? optionText : option
        );
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const updateCorrectAnswer = (questionId, correctAnswerIndex) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId ? { ...question, correctAnswer: correctAnswerIndex } : question
    );
    setQuestions(updatedQuestions);
  };

  const updateQuestionType = (id, type) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id ? { ...question, type } : question
    );
    setQuestions(updatedQuestions);
  };

  const updateQuestionMarks = (id, marks) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id ? { ...question, marks: parseInt(marks) } : question
    );
    setQuestions(updatedQuestions);
  };

  const updateQuestionDifficulty = (id, difficulty) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id ? { ...question, difficulty } : question
    );
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <section className='flex flex-row justify-between m-2'>
        <h2 className='font-bold text-2xl'>Prepare Exam Paper</h2>
        <button className='button'
          onClick={addQuestion}>Add Question
        </button>
        {/* <div className='flex justify-around w-1/2'>
                <button className='button' 
                    onClick={addQuestion}>Add Question
                </button>
                <button className='button'>
                    Upload Paper
                </button>
                <button className='button'>
                    Save Paper
                </button>
            </div> */}
      </section>

      <section className='flex flex-col flex-wrap w-[90%] mx-auto'>
        {questions.map((question, index) => (
          <section key={question.id} className='my-4'>
            <div className='flex flex-row justify-between text-center my-2'>
              <h3 className='font-bold my-auto'>Question {index + 1}</h3>
              {/* Question Text */}
              <input
                type="text"
                className='w-[75%] m-1 p-2 bg-sky-500/10 rounded-xl border-4'
                placeholder="Enter question text"
                value={question.text}
                onChange={(e) => updateQuestionText(question.id, e.target.value)}
              />
              {/* Select Question Type */}
              <label className='my-auto border-2 p-1 rounded-full'>
                Question Type:
                <select
                  value={question.type}
                  onChange={(e) => updateQuestionType(question.id, e.target.value)}
                  className='my-auto mx-auto font-bold w-1/2 hover:translate-y-0.5 transition-all'
                >
                  <option className='bg-sky-100 w-full' value="MCQ">MCQ</option>
                  <option className='bg-sky-100 w-full' value="Theory">Theory</option>
                </select>
              </label>
            </div>

            <div className='my-4 flex justify-between'>
              {/* Select Difficulty Level */}
              <label className='my-auto border-2 p-2 rounded-full text-center'>
                Difficulty Level:
                <select
                  value={question.difficulty}
                  onChange={(e) => updateQuestionDifficulty(question.id, e.target.value)}
                  className={`my-auto mx-auto font-bold w-1/2 hover:translate-y-0.5 transition-all ${question.difficulty === 'Easy' ? 'text-green-600' :
                    question.difficulty === 'Medium' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}              >
                  <option className='bg-green-200 w-full text-black' value="Easy">Easy</option>
                  <option className='bg-yellow-200 w-full text-black' value="Medium">Medium</option>
                  <option className='bg-red-200 w-full text-black' value="Hard">Hard</option>
                </select>
              </label>
              {/* Marks Input */}
              <label className='my-auto border-2 p-2 rounded-full text-center'>
                Marks:
                <input
                  type="number"
                  value={question.marks}
                  onChange={(e) => updateQuestionMarks(question.id, e.target.value)}
                  min="0"
                  className='font-bold w-20 p-1'
                />
              </label>
            </div>

            {/* Render appropriate editor based on the question type */}
            {question.type === 'MCQ' ? (
              <div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className='flex flex-row'>
                    {/* <input
                      type="radio"
                      name={`correctAnswer-${question.id}`}
                      checked={question.correctAnswer === optionIndex}
                      onChange={() => updateCorrectAnswer(question.id, optionIndex)}
                      className=''
                    /> */}
                    <CustomRadioButton
                      id={`option-${question.id}-${optionIndex}`}
                      value={option}
                      checked={question.correctAnswer === optionIndex}
                      onChange={() => updateCorrectAnswer(question.id, optionIndex)}
                    >
                    </CustomRadioButton>
                    <input
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        updateOptionText(question.id, optionIndex, e.target.value)
                      }
                      className='border-2 border-gray-300 my-1 p-2 rounded-md mx-auto w-[90%]'
                    />

                  </div>
                ))}
              </div>
            ) : (
              <textarea
                placeholder="Enter the theory answer or details here..."
                value={question.text} // In theory questions, the text field could be more detailed
                onChange={(e) => updateQuestionText(question.id, e.target.value)}
                className='w-full border-4 p-2 rounded-xl'
              />
            )}
          </section>
        ))}
      </section>
    </div>
  );
}

export default ExamBuilder;
