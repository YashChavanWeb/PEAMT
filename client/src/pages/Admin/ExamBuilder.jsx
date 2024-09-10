import React, { useState } from 'react';
import CustomRadioButton from './CustomRadioButton';
import axios from 'axios'; // Import Axios for API calls

function ExamBuilder() {
  const [questions, setQuestions] = useState([]);
  const [examName, setExamName] = useState(''); // Store exam name
  const [adminEmail, setAdminEmail] = useState(''); // Store admin email

  // Function to add a new question
  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: '',
      type: 'MCQ',
      options: ['', '', '', ''],
      correctAnswer: null,
      marks: 0,
      difficulty: 'Medium',
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

  // Function to submit the exam questions to the backend
  const submitExamQuestions = async () => {
    try {
      const data = {
        examName,
        questions,
        adminEmail,
      };
      const response = await axios.post('/api/examQuestions', data); // Adjust the API URL if needed
      if (response.status === 201) {
        alert('Exam questions created successfully');
      } else {
        alert('Failed to create exam questions');
      }
    } catch (error) {
      console.error('Error submitting exam questions:', error);
      alert('Failed to create exam questions');
    }
  };

  return (
    <div>
      <section className='flex flex-row justify-between m-2'>
        <h2 className='font-bold text-2xl'>Prepare Exam Paper</h2>
        <button className='button' onClick={addQuestion}>Add Question</button>
      </section>

      {/* Input for Exam Name */}
      <div className="my-4">
        <label>
          Exam Name:
          <input
            type="text"
            className="border-2 p-2 rounded-xl"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            placeholder="Enter exam name"
          />
        </label>
      </div>

      {/* Input for Admin Email */}
      <div className="my-4">
        <label>
          Admin Email:
          <input
            type="email"
            className="border-2 p-2 rounded-xl"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            placeholder="Enter admin email"
          />
        </label>
      </div>

      <section className='flex flex-col flex-wrap w-[90%] mx-auto'>
        {questions.map((question, index) => (
          <section key={question.id} className='my-4'>
            <div className='flex flex-row justify-between text-center my-2'>
              <h3 className='font-bold my-auto'>Question {index + 1}</h3>
              <input
                type="text"
                className='w-[75%] m-1 p-2 bg-sky-500/10 rounded-xl border-4'
                placeholder="Enter question text"
                value={question.text}
                onChange={(e) => updateQuestionText(question.id, e.target.value)}
              />
              <label className='my-auto border-2 p-1 rounded-full'>
                Question Type:
                <select
                  value={question.type}
                  onChange={(e) => updateQuestionType(question.id, e.target.value)}
                  className='my-auto mx-auto font-bold w-1/2 hover:translate-y-0.5 transition-all'
                >
                  <option value="MCQ">MCQ</option>
                  <option value="Theory">Theory</option>
                </select>
              </label>
            </div>

            <div className='my-4 flex justify-between'>
              <label className='my-auto border-2 p-2 rounded-full text-center'>
                Difficulty Level:
                <select
                  value={question.difficulty}
                  onChange={(e) => updateQuestionDifficulty(question.id, e.target.value)}
                  className={`my-auto mx-auto font-bold w-1/2 ${question.difficulty === 'Easy' ? 'text-green-600' : question.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </label>
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

            {question.type === 'MCQ' ? (
              <div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className='flex flex-row'>
                    <CustomRadioButton
                      id={`option-${question.id}-${optionIndex}`}
                      value={option}
                      checked={question.correctAnswer === optionIndex}
                      onChange={() => updateCorrectAnswer(question.id, optionIndex)}
                    />
                    <input
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => updateOptionText(question.id, optionIndex, e.target.value)}
                      className='border-2 border-gray-300 my-1 p-2 rounded-md mx-auto w-[90%]'
                    />
                  </div>
                ))}
              </div>
            ) : (
              <textarea
                placeholder="Enter the theory answer or details here..."
                value={question.text}
                onChange={(e) => updateQuestionText(question.id, e.target.value)}
                className='w-full border-4 p-2 rounded-xl'
              />
            )}
          </section>
        ))}
      </section>

      <button className='button mt-4' onClick={submitExamQuestions}>
        Submit Exam Questions
      </button>
    </div>
  );
}

export default ExamBuilder;
