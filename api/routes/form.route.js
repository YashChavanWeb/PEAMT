// routes/form.routes.js

import express from 'express';
import { submitForm, getAdmins, getAdminById, updateAdmin, deleteAdmin } from '../controllers/form.controller.js';

const router = express.Router();

router.post('/submit-form', submitForm);
router.get('/admins', getAdmins);
router.get('/admins/:id', getAdminById);  // Route to get admin by ID
router.put('/admins/:id', updateAdmin);   // Route to update admin by ID
router.delete('/admins/:id', deleteAdmin); // Route to delete admin by ID

export default router;
