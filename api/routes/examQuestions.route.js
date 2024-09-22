import express from 'express';
import { createExamQuestions, getExamQuestions } from '../controllers/examQuestions.controller.js';

const router = express.Router();

// Create new exam questions
router.post('/', createExamQuestions);

// Fetch exam questions for a specific exam
router.get('/', getExamQuestions);

export default router;
