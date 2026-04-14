import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const translationsSchema = new Schema(
  {
    br: { type: String, trim: true },
    ko: { type: String, trim: true },
    'pt-BR': { type: String, trim: true },
    pt: { type: String, trim: true },
    nl: { type: String, trim: true },
    hr: { type: String, trim: true },
    fa: { type: String, trim: true },
    de: { type: String, trim: true },
    es: { type: String, trim: true },
    fr: { type: String, trim: true },
    ja: { type: String, trim: true },
    it: { type: String, trim: true },
    'zh-CN': { type: String, trim: true },
    tr: { type: String, trim: true },
    ru: { type: String, trim: true },
    uk: { type: String, trim: true },
    pl: { type: String, trim: true },
    hi: { type: String, trim: true },
    ar: { type: String, trim: true }
  },
  { _id: false }
);

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
    state_id: {
      type: Number,
      required: true
    },
    state_code: {
      type: String,
      required: true,
      trim: true
    },
    state_name: {
      type: String,
      required: true,
      trim: true
    },
    country_id: {
      type: Number,
      required: true
    },
    country_code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    country_name: {
      type: String,
      required: true,
      trim: true
    },
    latitude: {
      type: String,
      required: true,
      trim: true
    },
    longitude: {
      type: String,
      required: true,
      trim: true
    },
    native: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    type: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: Number,
      required: false,
      default: null
    },
    parent_id: {
      type: Number,
      required: false,
      default: null
    },
    population: {
      type: Number,
      required: false,
      default: null
    },
    timezone: {
      type: String,
      required: true,
      trim: true
    },
    translations: {
      type: translationsSchema,
      required: false,
      default: null
    },
    wikiDataId: {
      type: String,
      required: false,
      trim: true,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model('City', citySchema);
