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
    name_hi: { type: String, default: '' },
    name_ru: { type: String, default: '' },
    name_en: { type: String, default: '' },
    description_ru: { type: String, default: '' },
    description_hi: { type: String, default: '' },
    description_en: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('EkadashInfo', EkNamesSchema);
