import express from 'express';
import { submitResult, getResults } from '../controllers/resultController.js';

const router = express.Router();

router.post('/submitResult', submitResult);
router.get('/results/:userId', getResults);

export default router;
