import express from 'express';
import { getAll, getById, getByName } from '../controllers/ekadashInfo.js';

const router = express.Router();

router.get('/', getAll);
router.get('/name/:name', getByName);
router.get('/search', getByName); // query: ?name=...
router.get('/:id', getById);

export default router;
