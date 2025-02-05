import mongoose from 'mongoose';
import EkadashInfo from './ekadashInfo.js';
const Schema = mongoose.Schema;

// const DaySchema = {
//   holiday: { type: String, default: '0' },
//   ekadasi_name: { type: String, default: null },
//   ekadasi_name_ru: { type: String, default: null },
//   ekadasi_name_en: { type: String, default: null },
//   ekadasi_name_hi: { type: String, default: null },
//   description: { type: String, default: null },
//   description_ru: { type: String, default: null },
//   description_en: { type: String, default: null },
//   description_hi: { type: String, default: null },
//   exit_time: { type: String, default: null },
//   light_time: { type: String, default: null }
// };

const YearSchema = new Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  day: { type: Number, required: true },
  ekadasi_name: { type: String, default: null },
  description_data: { type: mongoose.Schema.Types.ObjectId, ref: EkadashInfo },
  exit_time: { type: String, default: null }
});

export default mongoose.model('Ekadashi', YearSchema);
