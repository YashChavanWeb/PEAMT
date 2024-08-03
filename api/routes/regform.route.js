import express from 'express';
import { createOrUpdateRegForm, getRegFormById, updateRegForm } from '../controllers/regform.controller.js';


const router = express.Router();

// Create a new registration form
router.post('/', createOrUpdateRegForm);

// Get a registration form by ID
router.get('/:id', getRegFormById);

// Update a registration form by ID
router.put('/:id', updateRegForm);

export default router;
