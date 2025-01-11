const wordSyntaxEditor = require("../wordSyntaxEditor");
const wordLexicalEditor = require("../wordLexicalEditor");
const isUpper = require("../isUpper");
const Word = require('../../models/word')

// Супер-неоптимизированный алгоритм
// Преобразует массив со словами в массив с объектами:
// {
//   word: 'word',
//   known: boolean
// }
const wordArrayConverter = async (wordArray, userVocabulary, bigDic) => {
    const result = [];

    for (word of wordArray) {
      const wordObject = { word, known: true };

      let editedWord = wordSyntaxEditor(word);
      editedWord = wordLexicalEditor(editedWord);

      if ((isUpper(word) && bigDic.includes(editedWord)) || !isUpper(word)) {
        if (!userVocabulary.includes(editedWord) && editedWord.length > 1) {
          wordObject.known = false;
          const wordFromBigDic = await Word.findOne({word: editedWord})

          // Добавляем _id
          wordObject._id = wordFromBigDic._id

          // Добавляем транскрипцию
          wordObject.phonetic = wordFromBigDic.phonetic

          // Добавляем перевод
          wordObject.translation = wordFromBigDic.translation

          // Проверяем есть ли у слова определения/синонимы/примеры
          // если есть - добавляем, но в ограниченном количестве
          if (wordFromBigDic.definitions.length) {
            const array = []
            let i = 0
            while (i < wordFromBigDic.definitions.length && i < 2) {
              array.push(wordFromBigDic.definitions[i])
              i++
            }
            wordObject.definition = array
          }

          if (wordFromBigDic.synonyms.length) {
            const array = []
            let i = 0
            while (i < wordFromBigDic.synonyms.length && i < 4) {
              array.push(wordFromBigDic.synonyms[i])
              i++
            }
            wordObject.synonyms = array
          }

          if (wordFromBigDic.examples.length) {
            const array = []
            let i = 0
            while (i < wordFromBigDic.examples.length && i < 4) {
              array.push(wordFromBigDic.examples[i])
              i++
            }
            wordObject.examples = array
          }
        }
      }

      result.push(wordObject);
    }

    return result;
};

module.exports = wordArrayConverter;
