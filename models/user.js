import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const citySchema = new Schema(
  {
    deviceId: {
      type: String,
      required: true,
      trim: true
    },
    language: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: false,
      default: null
    },
    tg: {
      type: String,
      required: false,
      default: null
    },
    daysRemindPush: {
      type: Number,
      required: false,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', citySchema);
