const express = require('express');
const router = express.Router();

const {
  getKnownWords,
  postUnknownWord,
  deleteKnownWord,
  deleteAllWords,
  postLearningWord,
  postKnownWord,
  postLevelsWords,
  getWord,
  getWords
} = require('../controllers/city');

router.route('/knownWord').get(getKnownWords).post(postKnownWord).delete(deleteKnownWord);
router.post('/unknownWord', postUnknownWord);
router.post('/learningWord', postLearningWord);

router.get('/word', getWord);
router.post('/infinitives', getWords); // получаем инфинитивы по id
router.delete('/allWords', deleteAllWords);

router.post('/levelsWords', postLevelsWords);

module.exports = router;
