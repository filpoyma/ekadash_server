import express from 'express';
import checkXApiKey from '../middlewares/checkXApiKey.js';
import checkAuth from '../middlewares/checkAuth.js';
import logsRouter from './logs.js';
import authRouter from './auth.js';
import userRouter from './user.js';
import ekadashRouter from './ekadash.js';
import ekadashInfoRouter from './ekadashInfo.js';
import cityRouter from './city.js';
import setLanguage from '../middlewares/setLanguage.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  // logger.info('origin:', req.get('origin'));
  // logger.info('host:', req.get('host'));
  // logger.info('headers:', req.get('headers'));
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    time: new Date().toISOString()
  });
});

// API routes
router.use('/logs', logsRouter);
router.use(checkXApiKey);
router.use(checkAuth);
router.use(setLanguage);
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/ekadash', ekadashRouter);
router.use('/ekadash-info', ekadashInfoRouter);
router.use('/city', cityRouter);

export default router;
