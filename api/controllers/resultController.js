// controllers/resultController.js
import Result from '../models/Result.model.js';
import ExamQuestions from '../models/examQuestions.model.js';

export const submitResult = async (req, res) => {
    const { userId, examName, responses } = req.body;

    // Validate input
    if (!userId || !examName || !responses) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Fetch the correct answers from the database
        const exam = await ExamQuestions.findOne({ examName });
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        // Calculate the score
        let score = 0;
        const correctAnswers = exam.questions.map(q => q.correctAnswer);

        correctAnswers.forEach((correctAnswer, index) => {
            if (responses[index] === correctAnswer) {
                score += 1; // Increment score for correct answers
            }
        });

        // Create a new result record
        const result = new Result({
            examName,
            userId,
            score,
            responses,
        });

        await result.save(); // Save the result to the database

        res.status(201).json(result); // Respond with the newly created result
    } catch (error) {
        console.error("Error in submitResult:", error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


export const getResults = async (req, res) => {
    const { userId } = req.params;

    try {
        const results = await Result.find({ userId });
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
