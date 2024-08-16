import express from 'express';
import Exam from '../models/Exam.js';

const router = express.Router();

// Create a new exam
router.post('/', async (req, res) => {
    try {
        const newExam = new Exam(req.body);
        await newExam.save();
        res.status(201).json({ message: 'Exam created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create exam', error });
    }
});

export default router;
