import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EkNamesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    name_hi: {
      type: String,
      trim: true
    },
    name_ru: {
      type: String,
      trim: true
    },
    name_en: {
      type: String,
      trim: true
    },
    description: { type: String, default: null },
    description_ru: { type: String, default: null },
    description_hi: { type: String, default: null },
    description_en: { type: String, default: null }
  },
  { timestamps: true }
);

export default mongoose.model('EkadashInfo', EkNamesSchema);
