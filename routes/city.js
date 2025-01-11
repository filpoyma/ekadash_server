const express = require('express');
const router = express.Router();

const { getByName } = require('../controllers/city');

router.get('/', getByName);

module.exports = router;
