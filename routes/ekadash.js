import express from 'express';
import { getByYear, getByMonth, getByDay } from '../controllers/ekadash.js';

const router = express.Router();
router.get('/year', getByYear);
router.get('/month', getByMonth);
router.get('/day', getByDay);

export default router;
