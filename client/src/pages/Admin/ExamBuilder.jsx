import React, { useState, useEffect } from 'react';
import CustomRadioButton from './CustomRadioButton';
import axios from 'axios'; // Import Axios for API calls
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state

function ExamBuilder() {
  const [questions, setQuestions] = useState([]);
  const [examName, setExamName] = useState('');
  const [examOptions, setExamOptions] = useState([]); // State to hold dropdown options
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(''); // Add error state

  const { currentUser } = useSelector((state) => state.user);
  const adminEmail = currentUser?.email || ''; // Use the email from currentUser

  useEffect(() => {
    // Fetch existing exams for the admin email on component mount
    const fetchExams = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('/api/exams');
        const exams = response.data;
        // Filter exams for the current admin email
        const adminExams = exams.filter(exam => exam.adminEmail === adminEmail);
        setExamOptions(adminExams);
      } catch (error) {
        console.error('Error fetching exams:', error);
        setError('Error fetching exams.');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [adminEmail]);

  useEffect(() => {
    if (examName) {
      // Fetch existing questions for the selected exam name
      const fetchExistingQuestions = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get('/api/examQuestions', { params: { examName } });
          // Access the `questions` property from the response data
          const existingQuestions = response.data.questions || [];
          setQuestions(existingQuestions);
        } catch (error) {
          console.error('Error fetching existing exam questions:', error);
          setError('Error fetching exam questions.');
        } finally {
          setLoading(false);
        }
      };

      fetchExistingQuestions();
    }
  }, [examName]);

  const handleExamNameChange = (event) => {
    setExamName(event.target.value);
  };

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: '',
      type: 'MCQ',
      options: ['', '', '', ''],
      correctAnswer: null,
      marks: 0,
      difficulty: 'Medium',
      answerText: ''
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

  const updateTheoryAnswerText = (id, answerText) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id ? { ...question, answerText } : question
    );
    setQuestions(updatedQuestions);
  };

  const submitExamQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const data = {
        examName,
        questions,
        adminEmail,
      };
      const response = await axios.post('/api/examQuestions', data);
      if (response.status === 200 || response.status === 201) {
        alert('Exam questions submitted successfully');
      } else {
        alert('Failed to submit exam questions');
      }
    } catch (error) {
      console.error('Error submitting exam questions:', error);
      alert('Failed to submit exam questions');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <section className='flex flex-row justify-between m-2'>
        <h2 className='font-bold text-2xl'>Prepare Exam Paper</h2>
        <button className='button' onClick={addQuestion}>Add Question</button>
      </section>

      {/* Dropdown for Exam Name */}
      <div className="my-4">
        <label>
          Select Exam Name:
          <select
            value={examName}
            onChange={handleExamNameChange}
            className="border-2 p-2 rounded-xl"
          >
            <option value="">Select an exam</option>
            {examOptions.map(exam => (
              <option key={exam.examName} value={exam.examName}>
                {exam.examName}
              </option>
            ))}
          </select>
        </label>
      </div>
      <section className='flex flex-col flex-wrap w-[90%] mx-auto'>
        {questions.length === 0 && examName ? (
          <p>No questions available for the selected exam. You can add new questions below.</p>
        ) : (
          questions.map((question) => (
            <section key={question.id} className='my-4'>
              <div className='flex flex-row justify-between text-center my-2'>
                <h3 className='font-bold my-auto'>Question {question.id}</h3>
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
                    <div key={`${question.id}-${optionIndex}`} className='flex flex-row'>
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
                        className='border-2 p-2 rounded-xl my-2'
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <textarea
                    placeholder="Enter answer text"
                    value={question.answerText}
                    onChange={(e) => updateTheoryAnswerText(question.id, e.target.value)}
                    className='border-2 p-2 rounded-xl w-full'
                  />
                </div>
              )}
            </section>
          ))
        )}
      </section>

      <div className='text-center my-4'>
        <button onClick={submitExamQuestions} className='button'>Submit Exam Questions</button>
      </div>
    </div>
  );
}

export default ExamBuilder;
