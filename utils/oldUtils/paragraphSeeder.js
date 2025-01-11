const mongoose = require("mongoose");
const fs = require("fs");

const Text = require("../../models/text");
const db = "mongodb://localhost/lexicon";

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// Загружаем тексты в БД
const paragraphSeeder = async (paragraphs) => {
  paragraphs = fs.readFileSync(paragraphs);
  paragraphs = JSON.parse(paragraphs);

  for (paragraph of paragraphs) {
    const text = await new Text({
      text: paragraph,
      author: 'Folktale',
      book: 'Shortys'
    })
    await text.save();
  }

  mongoose.connection.close();
};

paragraphSeeder('../library/stories/supereasyClear.json');
