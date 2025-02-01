import express from 'express';
import { index, getEkadash, setMoonDays } from '../controllers/index.js';

const router = express.Router();

router.get('/', index);
router.get('/save', getEkadash);
router.get('/moon', setMoonDays);

export default router;
