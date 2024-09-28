// routes/result.routes.js

import express from 'express';
import { submitResult, getResults } from '../controllers/resultController.js';

const router = express.Router();

router.post('/submitResult', submitResult);
router.get('/results', getResults);

export default router;
