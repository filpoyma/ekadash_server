const fs = require("fs");

const addInfinitive = (dic) => {
  dic = fs.readFileSync(dic);
  dic = JSON.parse(dic);

  for (word of dic) {
    if (!word.brief) {
      word.brief = "";
    }
  }

  const json = JSON.stringify(dic);
  fs.writeFileSync("newBigDic.json", json);
};

// addInfinitive("./bigDic.json");
