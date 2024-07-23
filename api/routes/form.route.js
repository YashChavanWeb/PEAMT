// routes/form.route.js

import express from 'express';
import { submitForm } from '../controllers/form.controller.js'; // Assuming this is where submitForm is defined

const router = express.Router();

router.post('/submit-form', submitForm);

export default router;
