import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
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
    timezone: {
      type: String,
      required: true,
      trim: true
    },
    geo: {
      lan: {
        type: Number,
        required: false,
        default: null
      },
      long: {
        type: Number,
        required: false,
        default: null
      },
      city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: false,
        default: null
      },
      country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: false,
        default: null
      }
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
    },
    notifiedToday: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
