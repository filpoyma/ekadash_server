import Country from '../models/countries.js';
import logger from '../utils/logger.js';
import {
  buildEntityTextSearchOr,
  getLocalizedEntityName,
  resolveSuggestionLanguage
} from '../utils/i18n.helpers.js';

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const searchCountries = async (req, res) => {
  try {
    const query = (req.query.q || '').trim();
    const limit = Math.min(Math.max(parseInt(String(req.query.limit), 10) || 20, 1), 50);
    const suggestionLanguage = resolveSuggestionLanguage(res.locals.language);

    if (!query) return res.json([]);

    const searchRegex = new RegExp(escapeRegex(query), 'i');
    const exactIso2 = query.length === 2 ? query.toUpperCase() : null;
    const textSearchOr = buildEntityTextSearchOr(searchRegex, suggestionLanguage);
    const searchFilter = exactIso2
      ? { $or: [{ iso2: exactIso2 }, ...textSearchOr] }
      : { $or: [...textSearchOr, { iso2: searchRegex }] };
    const countries = await Country.find(searchFilter).limit(limit).lean();

    const countriesResponse = countries.map((country) => ({
      _id: String(country._id),
      id: country.id,
      iso2: country.iso2,
      name: getLocalizedEntityName(country, suggestionLanguage) ?? country.name
    }));

    res.json(countriesResponse);
  } catch (err) {
    logger.error(`Error searchCountries: ${err}`);
    res.status(500).send(String(err));
  }
};
