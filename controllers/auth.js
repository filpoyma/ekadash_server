import User from '../models/user.js';
import logger from '../utils/logger.js';
import { getLocalizedEntityName } from '../utils/i18n.helpers.js';

const normalizeUserGeo = (user, language) => {
  if (!user) return null;

  const normalizedLanguage =
    typeof language === 'string' && language.trim().length ? language : user.language;

  if (user.geo?.city && typeof user.geo.city === 'object') {
    user.geo.cityId = String(user.geo.city._id);
    user.geo.city = getLocalizedEntityName(user.geo.city, normalizedLanguage);
  }
  if (user.geo?.country && typeof user.geo.country === 'object') {
    user.geo.countryId = String(user.geo.country._id);
    user.geo.country = getLocalizedEntityName(user.geo.country, normalizedLanguage);
  }

  return user;
};

const getUserWithLocalizedGeo = async ({ deviceId, language }) => {
  const user = await User.findOne({ deviceId })
    .populate('geo.city', 'name translations')
    .populate('geo.country', 'name translations')
    .lean();

  return normalizeUserGeo(user, language);
};

export const signUp = async (req, res) => {
  const { deviceId, language, timezone } = req.body;
  try {
    const existing = await User.findOne({ deviceId }).lean();
    if (existing) {
      const user = await getUserWithLocalizedGeo({
        deviceId,
        language: language || res.locals.language
      });
      return res.json(user);
    }
    const user = new User({ deviceId, language, timezone });
    await user.save();
    res.json(user.toObject());
  } catch (err) {
    logger.error(`Error create User: ${err}`);
    res.status(500).send(`Error create User: ${err.message}`);
  }
};

export const signIn = async (req, res) => {
  const { deviceId } = req.body;
  const { language } = res.locals;
  try {
    const user = await getUserWithLocalizedGeo({ deviceId, language });
    if (user) return res.json(user);
    return res.json(null);
  } catch (err) {
    logger.error(`Error create User: ${err}`);
    res.status(500).send(err);
  }
};
