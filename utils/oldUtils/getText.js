const getPercent = require("../getPercent");
const wordSyntaxEditor = require("../wordSyntaxEditor");
const wordLexicalEditor = require("../wordLexicalEditor");
const isUpper = require('../isUpper');

//TODO: совместить логику с wordArrayConverter
// Возвращает массив со словами текста, который ны n% состоит из словарного запаса
const getText = async (
  userVocabulary,
  bigDic,
  paragraphs,
  percentOfUnknownWords
) => {
  let editedWord;
  for (let object of paragraphs) {
    const paragraph = object.text;
    let unknownWords = 0;

    for (let word of paragraph) {
      editedWord = wordSyntaxEditor(word);
      editedWord = wordLexicalEditor(editedWord);

      if ((isUpper(word) && bigDic.includes(editedWord)) || !isUpper(word)) {
        if (!userVocabulary.includes(editedWord) && editedWord.length > 1) {
          unknownWords++;
        }
      }
    }

    if (getPercent(unknownWords, paragraph.length) <= percentOfUnknownWords) {
      return object;
    }
  }

  return null;
};

module.exports = getText;
