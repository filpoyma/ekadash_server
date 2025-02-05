import express from 'express';
import { getByYear, getByMonth } from '../controllers/ekadash.js';

const router = express.Router();
router.get('/year', getByYear);
router.get('/month', getByMonth);

export default router;
