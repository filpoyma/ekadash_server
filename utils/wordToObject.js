const fs = require("fs");

// Преобразует слова из массива
// в объект с пустыми полями модели Word
// возвращает массив объектов в формате .json
const wordToObject = (array) => {
  array = fs.readFileSync(array);
  array = JSON.parse(array);

  const newArray = [];

  for (word of array) {
    const obj = {
      infinitive: word,
      word: [word],
      translation: [],
      phonetic: "",
      definition: [],
      synonyms: [],
      antonyms: [],
      examples: [],
      wrongAnswers: [],
      dictionary: 'book'
    };

    newArray.push(obj);
  }

  const json = JSON.stringify(newArray);
  fs.writeFileSync("allBooksWordsWithoutDuplicateObjects.json", json);
};

wordToObject('../../code/addBook/getCommonNames/allBooksWordsWithoutDuplicate.json')
