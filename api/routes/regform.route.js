import express from 'express';
import { createRegForm, getRegFormById, updateRegForm, getRegFormByAdhar } from '../controllers/regFormController.js';

const router = express.Router();

router.post('/', createRegForm);
router.get('/:id', getRegFormById);
router.put('/:id', updateRegForm);

// New route to get form by Aadhar number
router.get('/adhar/:adhar', getRegFormByAdhar);

export default router;
