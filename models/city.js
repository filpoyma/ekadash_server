import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const citySchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      trim: true
    },
    zone: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('City', citySchema);
