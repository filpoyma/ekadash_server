const fs = require("fs");

// Наличие дефисов —-
const isHyphen = (string) => {
  const symbols = [
    "—",
    "-",
    "’",
    "‘",
    "é",
    "è",
    "!",
    "@",
    "#",
    "$",
    "№",
    "'",
    '"',
    ";",
    ":",
    "{",
    "}",
    "[",
    "]",
    "(",
    ")",
    "%",
    "^",
    "&",
    "?",
    "*",
    ">",
    "<",
    "”",
    "“",
    "/",
    ",",
    ".",
    "`",
    "~",
    "|",
    "+",
    "=",
    "_",
  ];
  for (let symbol of symbols) {
    if (string.includes(symbol)) {
      return true;
    }
  }

  return false;
};

const countWordsWithDefis = (file) => {
  file = fs.readFileSync(file);
  file = JSON.parse(file);

  const wordsWithDefis = [];

  for (wordObject of file) {
    if (isHyphen(wordObject.word)) {
      wordsWithDefis.push(wordObject);
      // console.log(wordObject.word, " : ", wordObject.translation);
    }
  }
};
// countWordsWithDefis('./BIGDIC.json')
