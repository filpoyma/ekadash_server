const express = require('express');
const router = express.Router();

const { getByYear } = require('../controllers/ekadash');

router.get('/years', getByYear);

module.exports = router;
