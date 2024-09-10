import ExamQuestions from "../models/examQuestions.model.js";

// Create new exam questions
export const createExamQuestions = async (req, res) => {
    try {
        const { examName, questions, adminEmail } = req.body;
        const newExamQuestions = new ExamQuestions({ examName, questions, adminEmail });
        await newExamQuestions.save();
        res.status(201).json({ message: 'Exam questions created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create exam questions', error });
    }
};

// Fetch all exam questions
export const getExamQuestions = async (req, res) => {
    try {
        const exams = await ExamQuestions.find();
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch exam questions', error });
    }
};

