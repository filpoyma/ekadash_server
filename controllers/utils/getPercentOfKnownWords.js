const getPercentOfKnownWords = (book, userMap) => {
  const bookMap = {};
  let known = 0;
  let unknown = 0;

  const knownDictionaries = new Set(["properNoun", "aux", "loan", "number"]);

  for (let part of book.content) {
    for (let word of part.text) {
      const isKnown =
        word.editedWord.length <= 1 ||
        knownDictionaries.has(word.dictionary) ||
        userMap[word._id] === "known";

      if (!bookMap[word._id]) {
        bookMap[word._id] = isKnown ? "known" : "unknown";
        isKnown ? known++ : unknown++;
      }
    }
  }

  return Math.round((known / (unknown + known)) * 100);
};

module.exports = getPercentOfKnownWords;
