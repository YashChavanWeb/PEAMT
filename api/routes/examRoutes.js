import express from 'express';
import Exam from '../models/Exam.js';

const router = express.Router();

// Create a new exam
router.post('/', async (req, res) => {
    try {
        const { adminEmail, ...examDetails } = req.body; // Extract adminEmail from the request body
        const newExam = new Exam({ ...examDetails, adminEmail }); // Include adminEmail in the exam document
        await newExam.save();
        res.status(201).json({ message: 'Exam created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create exam', error });
    }
});

// Fetch all exams
router.get('/', async (req, res) => {
    try {
        const exams = await Exam.find(); // Retrieve all exams from the database
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch exams', error });
    }
});

export default router;