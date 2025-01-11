const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DaySchema = {
  holiday: { type: String, default: '0' },
  ekadasi_name: { type: String, default: null },
  ekadasi_name_ru: { type: String, default: null },
  description: { type: String, default: null },
  description_ru: { type: String, default: null },
  exit_time: { type: String, default: null },
  light_time: { type: String, default: null },
};

const MonthSchema = new Schema(
  {
    jan: { type: Map, of: DaySchema },
    feb: { type: Map, of: DaySchema },
    mar: { type: Map, of: DaySchema },
    apr: { type: Map, of: DaySchema },
    may: { type: Map, of: DaySchema },
    jun: { type: Map, of: DaySchema },
    jul: { type: Map, of: DaySchema },
    aug: { type: Map, of: DaySchema },
    sep: { type: Map, of: DaySchema },
    oct: { type: Map, of: DaySchema },
    nov: { type: Map, of: DaySchema },
    dec: { type: Map, of: DaySchema }
  },
  { _id: false }
);

const YearSchema = new Schema({
  id: { type: Number, required: true },
  year: { type: Number, required: true },
  months: { type: MonthSchema, required: true },
  city: { type: String, required: true },
  zone: { type: Number, required: true }
});

module.exports = mongoose.model('Ekadash', YearSchema);
