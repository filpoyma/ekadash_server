import express from 'express';
import { index, getEkadash, setMoonDays, convertDb } from '../controllers/index.js';
import checkXApiKey from '../middlewares/checkXApiKey.js';

const router = express.Router();

router.get('/', index);
router.get('/save', checkXApiKey, getEkadash);
router.get('/moon', setMoonDays);
router.get('/convertDB', convertDb);

export default router;
