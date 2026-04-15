import User from '../models/user.js';

const getLocalizedName = (entity, language) => {
  if (!entity) return null;

  const normalizedLanguage = typeof language === 'string' ? language.trim() : '';
  const translations = entity.translations ?? {};

  if (normalizedLanguage && typeof translations[normalizedLanguage] === 'string') {
    return translations[normalizedLanguage];
  }

  return entity.name ?? null;
};

export const getUser = async (req, res) => {
  const { deviceId, language } = res.locals;
  try {
    const user = await User.findOne({ deviceId })
      .populate('geo.city', 'name translations')
      .populate('geo.country', 'name translations')
      .lean();

    if (user) {
      if (user.geo?.city && typeof user.geo.city === 'object') 
        user.geo.city = getLocalizedName(user.geo.city, language);
      
      if (user.geo?.country && typeof user.geo.country === 'object') 
        user.geo.country = getLocalizedName(user.geo.country, language);
      
      return res.json(user);
    }

    res.json(null);
  } catch (err) {
    console.error('Error get User:', err);
    res.status(500).send(err);
  }
};

export const updateUser = async (req, res) => {
  const { deviceId } = res.locals;
  try {
    const updData = await User.updateOne({ deviceId }, req.body, { lean: true });
    res.json(updData);
  } catch (err) {
    console.error('Error create User:', err);
    res.status(500).send(err);
  }
};
