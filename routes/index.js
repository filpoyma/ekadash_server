const express = require('express');
const router = express.Router();

const { index, getEkadash, setMoonDays } = require('../controllers/index');

router.get('/', index);
router.get('/save', getEkadash);
router.get('/moon', setMoonDays);

module.exports = router;
