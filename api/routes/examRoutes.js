import express from 'express';
import Exam from '../models/Exam.js';
import bcrypt from 'bcrypt'; // Import bcrypt for comparing secure code
import moment from 'moment'; // Import moment.js for date manipulation

const router = express.Router();

// Create a new exam
router.post('/', async (req, res) => {
    try {
        const { adminEmail, secureCode, ...examDetails } = req.body;

        // Get the start and end of the current month
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();

        // Count exams created by the admin in the current month
        const count = await Exam.countDocuments({
            adminEmail,
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        });

        if (count >= 3) {
            return res.status(400).json({ message: 'You can only create up to 3 exams per month.' });
        }

        const newExam = new Exam({ ...examDetails, adminEmail, secureCode });
        await newExam.save();
        res.status(201).json({ message: 'Exam created successfully' });
    } catch (error) {
        console.error('Error creating exam:', error);
        res.status(500).json({ message: 'Failed to create exam', error });
    }
});

// Fetch all exams
router.get('/', async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json(exams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ message: 'Failed to fetch exams', error });
    }
});

// Verify secure code for the exam
router.post('/verify-code', async (req, res) => {
    const { examName, enteredCode } = req.body;
    try {
        const exam = await Exam.findOne({ examName }); // Find the exam by exam name

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        // Compare the entered code with the hashed secureCode using bcrypt
        const isMatch = await bcrypt.compare(enteredCode, exam.secureCode);
        if (isMatch) {
            return res.status(200).json({ valid: true, message: 'Code is valid' });
        } else {
            return res.status(400).json({ valid: false, message: 'Invalid secure code' });
        }
    } catch (error) {
        console.error('Error verifying code:', error);
        return res.status(500).json({ message: 'Error verifying code', error });
    }
});

export default router;
