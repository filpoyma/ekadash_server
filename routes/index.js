import express from 'express';
import {
  index,
  getEkadash,
  setMoonDays,
  convertDb,
  EkadashInfoCreate
} from '../controllers/index.js';
import checkXApiKey from '../middlewares/checkXApiKey.js';

const router = express.Router();

router.get('/', index);
// router.get('/save', getEkadash);
// router.get('/moon', setMoonDays);
// router.get('/createekinfo', EkadashInfoCreate);
// router.get('/convertDB', convertDb);

export default router;
