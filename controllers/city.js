import City from '../models/city.js';
import Country from '../models/countries.js';
import logger from '../utils/logger.js';
import {
  buildEntityTextSearchOr,
  getLocalizedEntityName,
  resolveSuggestionLanguage
} from '../utils/i18n.helpers.js';

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const toNumCoords = (lat, lon) => ({
  latitude: parseFloat(String(lat)),
  longitude: parseFloat(String(lon))
});

const formatCityRow = (cityDocument, suggestionLanguage) => {
  const displayName = getLocalizedEntityName(cityDocument, suggestionLanguage) ?? cityDocument.name;
  const coordinates = toNumCoords(cityDocument.latitude, cityDocument.longitude);
  return {
    _id: String(cityDocument._id),
    id: cityDocument.id,
    name: displayName,
    country_id: cityDocument.country_id,
    country_code: cityDocument.country_code,
    country_name: cityDocument.country_name,
    latitude: coordinates.latitude,
    longitude: coordinates.longitude
  };
};

/** Legacy: ?name= — same as search with q=name, no country filter */
export const getByName = async (req, res) => {
  const name = (req.query.name || req.query.q || '').trim();
  req.query.q = name;
  req.query.limit = req.query.limit || '20';
  return searchCities(req, res);
};

export const searchCities = async (req, res) => {
  try {
    const query = (req.query.q || '').trim();
    const limit = Math.min(Math.max(parseInt(String(req.query.limit), 10) || 20, 1), 50);
    const suggestionLanguage = resolveSuggestionLanguage(res.locals.language);
    const countryCode = (req.query.countryCode || '').trim().toUpperCase();
    const countryIdRaw = req.query.countryId;
    const countryId =
      countryIdRaw !== undefined && countryIdRaw !== '' && !Number.isNaN(Number(countryIdRaw))
        ? Number(countryIdRaw)
        : null;

    if (!query) return res.json([]);
    if (!countryCode && countryId === null) return res.json([]);

    const searchRegex = new RegExp(escapeRegex(query), 'i');
    const cityFilter = {
      $or: buildEntityTextSearchOr(searchRegex, res.locals.language)
    };
    if (countryCode) cityFilter.country_code = countryCode;
    else if (countryId !== null) cityFilter.country_id = countryId;

    const cities = await City.find(cityFilter).limit(limit).lean();
    res.json(cities.map((cityDocument) => formatCityRow(cityDocument, suggestionLanguage)));
  } catch (err) {
    logger.error(`Error searchCities: ${err}`);
    res.status(500).send(String(err));
  }
};

const scoreMatch = (cityNameNorm, queryNorm) => {
  if (cityNameNorm === queryNorm) return 100;
  if (cityNameNorm.startsWith(queryNorm)) return 80;
  if (cityNameNorm.includes(queryNorm)) return 50;
  return 0;
};

export const resolveCity = async (req, res) => {
  try {
    const countryCode = (req.query.countryCode || '').trim().toUpperCase();
    const cityName = (req.query.cityName || '').trim();
    const lang = resolveSuggestionLanguage(res.locals.language);

    if (!countryCode || !cityName) {
      return res.status(400).json({ message: 'countryCode and cityName are required' });
    }

    const queryNorm = cityName.toLowerCase();
    const safe = escapeRegex(cityName);
    const broad = new RegExp(safe, 'i');

    let docs = await City.find({ country_code: countryCode, name: broad }).limit(100).lean();

    if (!docs.length) {
      docs = await City.find({ country_code: countryCode, native: broad }).limit(100).lean();
    }

    let best = null;
    let bestScore = -1;

    for (const doc of docs) {
      const display = getLocalizedEntityName(doc, lang) ?? doc.name;
      const displayNorm = String(display).toLowerCase();
      const nameNorm = String(doc.name).toLowerCase();
      const nativeNorm = doc.native ? String(doc.native).toLowerCase() : '';
      const transVal =
        doc.translations && typeof doc.translations[lang] === 'string'
          ? String(doc.translations[lang]).toLowerCase()
          : '';
      const matchScore = Math.max(
        scoreMatch(displayNorm, queryNorm),
        scoreMatch(nameNorm, queryNorm),
        nativeNorm ? scoreMatch(nativeNorm, queryNorm) : 0,
        transVal ? scoreMatch(transVal, queryNorm) : 0
      );
      if (matchScore > bestScore) {
        bestScore = matchScore;
        best = doc;
      }
    }

    if (!best || bestScore < 1) {
      return res.json(null);
    }

    const countryDoc = await Country.findOne({ id: best.country_id }).lean();
    const coords = toNumCoords(best.latitude, best.longitude);

    res.json({
      cityId: String(best._id),
      countryId: countryDoc ? String(countryDoc._id) : null,
      cityName: getLocalizedEntityName(best, lang) ?? best.name,
      countryName: countryDoc
        ? (getLocalizedEntityName(countryDoc, lang) ?? countryDoc.name)
        : best.country_name,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  } catch (err) {
    logger.error(`Error resolveCity: ${err}`);
    res.status(500).send(String(err));
  }
};
