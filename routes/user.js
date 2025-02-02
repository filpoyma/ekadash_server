import express from 'express';
import { getUser, updateUser } from '../controllers/user.js';

const router = express.Router();
router.get('/', getUser);
router.patch('/update', updateUser);

export default router;
