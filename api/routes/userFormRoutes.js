import express from 'express';
import { saveFormData, getFormData } from '../controllers/userFormController.js'; // Ensure the file extension .js is included

const router = express.Router();

router.post('/save', saveFormData);
router.get('/:id', getFormData);

export default router;
