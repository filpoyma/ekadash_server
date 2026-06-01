import express from 'express';
import { searchCountries } from '../controllers/country.js';

const router = express.Router();
router.get('/search', searchCountries);

export default router;
