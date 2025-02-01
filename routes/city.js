import express from 'express';
import { getByName } from '../controllers/city.js';

const router = express.Router();
router.get('/', getByName);

export default router;
