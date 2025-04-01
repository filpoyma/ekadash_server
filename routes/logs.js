import express from 'express';
import { setLogs } from '../controllers/logs.js';

const router = express.Router();
router.post('/', setLogs);

export default router;
