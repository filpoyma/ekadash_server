import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const timezoneSchema = new Schema(
  {
    zoneName: {
      type: String,
      required: true,
      trim: true
    },
    gmtOffset: {
      type: Number,
      required: true
    },
    gmtOffsetName: {
      type: String,
      required: true,
      trim: true
    },
    abbreviation: {
      type: String,
      required: true,
      trim: true
    },
    tzName: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
);

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

const countrySchema = new Schema(
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
    iso3: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    iso2: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    numeric_code: {
      type: String,
      required: true,
      trim: true
    },
    phonecode: {
      type: String,
      required: true,
      trim: true
    },
    capital: {
      type: String,
      required: true,
      trim: true
    },
    currency: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    currency_name: {
      type: String,
      required: true,
      trim: true
    },
    currency_symbol: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    tld: {
      type: String,
      required: true,
      trim: true
    },
    native: {
      type: String,
      required: true,
      trim: true
    },
    population: {
      type: Number,
      required: true
    },
    gdp: {
      type: Number,
      required: false,
      default: null
    },
    region: {
      type: String,
      required: true,
      trim: true
    },
    region_id: {
      type: Number,
      required: true
    },
    subregion: {
      type: String,
      required: true,
      trim: true
    },
    subregion_id: {
      type: Number,
      required: true
    },
    nationality: {
      type: String,
      required: true,
      trim: true
    },
    area_sq_km: {
      type: Number,
      required: true
    },
    postal_code_format: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    postal_code_regex: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    timezones: {
      type: [timezoneSchema],
      required: true,
      default: []
    },
    translations: {
      type: translationsSchema,
      required: false,
      default: null
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
    emoji: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    emojiU: {
      type: String,
      required: false,
      trim: true,
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

export default mongoose.model('Country', countrySchema);
