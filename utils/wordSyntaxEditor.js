const wordSyntaxEditor = word => {
  word = word.toLowerCase();
  let wordEnd = word[word.length - 1];
  let wordStart = word[0];

  // Убираем кавычки
  if (wordStart === '"' || wordStart === "“" || wordStart === "‘") {
    word = wordSyntaxEditor(word.slice(1));
    wordEnd = word[word.length - 1];
    wordStart = word[0];
  }
  if (wordEnd === '"' || wordEnd === "”" || wordEnd === "’") {
    word = wordSyntaxEditor(word.slice(0, -1));
    wordEnd = word[word.length - 1];
    wordStart = word[0];
  }

  // Убираем скобки
  if (wordStart === "(") {
    word = wordSyntaxEditor(word.slice(1));
    wordEnd = word[word.length - 1];
    wordStart = word[0];
  }
  if (wordEnd === ")") {
    word = wordSyntaxEditor(word.slice(0, -1));
    wordEnd = word[word.length - 1];
    wordStart = word[0];
  }

  // Удаляем присвоение
  if (wordEnd === 's' && word[word.length - 2] === '’') {
    word = wordSyntaxEditor(word.slice(0, -2));
    wordEnd = word[word.length - 1];
    wordStart = word[0];
  }

  // Удаляем присвоение
  if (wordEnd === 's' && word[word.length - 2] === '\'') {
    word = wordSyntaxEditor(word.slice(0, -2));
    wordEnd = word[word.length - 1];
    wordStart = word[0];
  }

  // Удаляем знаки препинания в конце слова
  if (
    wordEnd === "," ||
    wordEnd === "." ||
    wordEnd === ";" ||
    wordEnd === "!" ||
    wordEnd === ":" ||
    wordEnd === "?"
  ) {
    word = wordSyntaxEditor(word.slice(0, -1));
    wordEnd = word[word.length - 1];
    wordStart = word[0];
  }

  // Проверяем наличие апострофа и удаляем, если он есть
  // const apostrophe = word[word.length - 2];
  // if (apostrophe === "'") {
  //   word = wordSyntaxEditor(word.slice(0, -2));
  //   wordEnd = word[word.length - 1];
  //   wordStart = word[0];
  // }

  return word;
};

module.exports = wordSyntaxEditor;
