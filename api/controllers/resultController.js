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
        // Fetch the exam questions from the database
        const exam = await ExamQuestions.findOne({ examName });
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        // Calculate the score
        let score = 0;

        // Iterate through each question in the exam
        exam.questions.forEach((question, index) => {
            const userResponse = responses[index];

            // Check if the user's response matches the correct answer
            if (userResponse && userResponse.option === question.options[question.correctAnswer]) {
                score += question.marks; // Add the question's marks to the score if correct
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
    const { userId } = req.query; // Changed from req.params to req.query

    try {
        const results = await Result.find({ userId });
        res.status(200).json(results); // Return the results with a status of 200
    } catch (error) {
        console.error("Error in getResults:", error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
