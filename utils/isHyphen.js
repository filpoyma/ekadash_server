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

module.exports = isHyphen;
