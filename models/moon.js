import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const moonSchema = new Schema({
  datetime: { type: String, default: null },
  sunrise: { type: String, default: null },
  sunset: { type: String, default: null },
  moonphase: { type: Number, default: null },
  moonrise: { type: String, default: null },
  moonset: { type: String, default: null }
});

export default mongoose.model('Moon', moonSchema);
