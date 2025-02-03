import express from 'express';
import { index, getEkadash, setMoonDays } from '../controllers/index.js';
import checkXApiKey from '../middlewares/checkXApiKey.js';

const router = express.Router();

router.get('/', index);
router.get('/save', checkXApiKey, getEkadash);
router.get('/moon', checkXApiKey, setMoonDays);

export default router;
