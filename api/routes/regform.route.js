import express from 'express';
import {
    createRegForm,
    getRegFormById,
    updateRegForm,
    getRegFormByAdhar,
    getExamNamesByUsername,
    getExamDetailsByNames
} from '../controllers/regFormController.js';

const router = express.Router();

router.post('/', createRegForm);
router.get('/:id', getRegFormById);
router.put('/:id', updateRegForm);

// Route to get form by Aadhar number
router.get('/adhar/:adhar', getRegFormByAdhar);
// router.get('/adhar/:adhar/exams', getExamNamesByAdhar);

// Route to get exams by username
router.get('/username/:username/exams', getExamNamesByUsername);

// New route to get exam details by exam names
router.get('/username/:username/exams/details', getExamDetailsByNames);

export default router;



