const getPercent = require("../getPercent");
const wordSyntaxEditor = require("../wordSyntaxEditor");
const wordLexicalEditor = require("../wordLexicalEditor");
const fs = require("fs");

// Слово с большой буквы или нет
const isUpper = (word) => {
  return word[0] === word[0].toUpperCase();
};

// Наличие дефисов —-
const isHyphen = (string) => {
  const symbols = [
    "—",
    "--",
    "é",
    "è",
    "!",
    "@",
    "#",
    "$",
    "№",
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
    "~",
    "|",
    "+",
    "=",
    "_",
  ];
  for (symbol of symbols) {
    if (string.includes(symbol)) {
      return true;
    }
  }

  return false;
};

// Берем [[слова, абзаца], [слова, абзаца], [слова, абзаца]]
// отсееваем только те абзацы, в которых 100% слов из BigDic
const paragraphParserFilter = async (
  bigDic,
  paragraphs,
  percentOfUnknownWords
) => {
  bigDic = await fs.readFileSync(bigDic);
  bigDic = await JSON.parse(bigDic);
  paragraphs = await fs.readFileSync(paragraphs);
  paragraphs = await JSON.parse(paragraphs);

  const vocabularyArray = [];
  for (word of bigDic) {
    vocabularyArray.push(word.word);
  }
  const texts = [];

  for (let i = 0; i < paragraphs.length; i += 1) {
    const paragraph = paragraphs[i];
    let unknownWords = 0;

    for (word of paragraph) {
      editedWord = wordSyntaxEditor(word);
      editedWord = wordLexicalEditor(editedWord);

      if (
        !vocabularyArray.includes(editedWord) &&
        editedWord.length > 1 &&
        !isUpper(word)
      ) {
        unknownWords++;
      }
    }

    if (getPercent(unknownWords, paragraph.length) <= percentOfUnknownWords) {
      console.log(paragraphs[i].join(" "));
      console.log(
        "Процент незнакомых слов: ",
        Math.floor(getPercent(unknownWords, paragraph.length)),
        "%"
      );
      console.log("Кол-во незнакомых слов: ", unknownWords, "\n");
      texts.push(paragraphs[i]);
    }
  }

  const json = JSON.stringify(texts);
  fs.writeFileSync('goodParagraphsFrom Uncle Wiggilys Story Book.json', json)
};

// paragraphParserFilter(
//   "./BIGDIC.json",
//   "../../code/utils/Uncle Wiggilys Story Book.json",
//   0
// );
