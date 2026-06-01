import User from '../models/user.js';
import { getLocalizedEntityName } from '../utils/i18n.helpers.js';

export const getUser = async (req, res) => {
  const { deviceId, language } = res.locals;
  try {
    const user = await User.findOne({ deviceId })
      .populate('geo.city', 'name translations')
      .populate('geo.country', 'name translations')
      .lean();

    if (user) {
      if (user.geo?.city && typeof user.geo.city === 'object') {
        user.geo.cityId = String(user.geo.city._id);
        user.geo.city = getLocalizedEntityName(user.geo.city, language);
      }
      if (user.geo?.country && typeof user.geo.country === 'object') {
        user.geo.countryId = String(user.geo.country._id);
        user.geo.country = getLocalizedEntityName(user.geo.country, language);
      }
      return res.json(user);
    }

    res.json(null);
  } catch (err) {
    console.error('Error get User:', err);
    res.status(500).send(err);
  }
};

const mergeGeo = (currentGeo, incomingGeo) => {
  const currentGeoObject = currentGeo && typeof currentGeo === 'object' ? currentGeo : {};
  const base = {
    lan: currentGeoObject.lan ?? null,
    long: currentGeoObject.long ?? null,
    city: currentGeoObject.city ?? null,
    country: currentGeoObject.country ?? null
  };
  if (!incomingGeo || typeof incomingGeo !== 'object') return base;
  const merged = { ...base };
  for (const key of ['lan', 'long', 'city', 'country'])
    if (Object.prototype.hasOwnProperty.call(incomingGeo, key)) merged[key] = incomingGeo[key];

  if (Object.prototype.hasOwnProperty.call(incomingGeo, 'cityId'))
    merged.city = incomingGeo.cityId ? incomingGeo.cityId : null;

  if (Object.prototype.hasOwnProperty.call(incomingGeo, 'countryId'))
    merged.country = incomingGeo.countryId ? incomingGeo.countryId : null;

  return merged;
};

export const updateUser = async (req, res) => {
  const { deviceId } = res.locals;
  try {
    const current = await User.findOne({ deviceId }).lean();
    if (!current) return res.status(404).json({ message: 'User not found' });

    const allowedTop = ['language', 'timezone', 'email', 'tg', 'daysRemindPush', 'geo'];
    const $set = {};

    for (const key of allowedTop) {
      if (!Object.prototype.hasOwnProperty.call(req.body, key)) continue;
      if (key === 'geo') {
        $set.geo = mergeGeo(current.geo, req.body.geo);
      } else {
        $set[key] = req.body[key];
      }
    }

    if (Object.keys($set).length === 0) {
      return res.json({ acknowledged: true, matchedCount: 1, modifiedCount: 0 });
    }

    const updateResult = await User.updateOne({ deviceId }, { $set });
    res.json(updateResult);
  } catch (err) {
    console.error('Error update User:', err);
    res.status(500).send(err);
  }
};
