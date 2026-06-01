import express from 'express';
import { getByName, searchCities, resolveCity } from '../controllers/city.js';

const router = express.Router();
router.get('/search', searchCities);
router.get('/resolve', resolveCity);
router.get('/', getByName);

export default router;
