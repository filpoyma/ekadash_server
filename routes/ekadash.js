import express from 'express';
import { getByYear } from '../controllers/ekadash.js';

const router = express.Router();
router.get('/years', getByYear);

export default router;
