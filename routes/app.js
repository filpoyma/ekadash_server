import express from 'express';
import { getVersionStatus } from '../controllers/app/version.controller.js';

const router = express.Router();

router.get('/version', getVersionStatus);

export default router;
