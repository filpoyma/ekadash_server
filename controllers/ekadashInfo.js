import EkadashInfo from '../models/ekadashInfo.js';
import logger from '../utils/logger.js';

/**
 * Get all ekadashi info records.
 * Query: limit (optional, default 100, max 500)
 */
export const getAll = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 100, 500);
    const items = await EkadashInfo.find({}, null, { lean: true }).limit(limit).sort({ name: 1 });

    res.json({
      status: true,
      data: items.map((item) => ({
        id: item._id,
        name: item.name,
        name_hi: item.name_hi,
        name_ru: item.name_ru,
        name_en: item.name_en,
        description_ru: item.description_ru,
        description_hi: item.description_hi,
        description_en: item.description_en,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }))
    });
  } catch (err) {
    logger.error(`getAll ekadashInfo err: ${err}`);
    res.status(500).json({ status: false, message: 'Error fetching ekadashi info' });
  }
};

/**
 * Get one ekadashi info by id.
 */
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await EkadashInfo.findById(id).lean();

    if (!item) return res.status(404).json({ status: false, message: 'Ekadashi info not found' });

    res.json({
      status: true,
      data: {
        ...item,
        id: item._id
      }
    });
  } catch (err) {
    logger.error(`getById ekadashInfo err: ${err}`);
    res.status(500).json({ status: false, message: 'Error fetching ekadashi info' });
  }
};

/**
 * Get one ekadashi info by name (exact or case-insensitive).
 * Query: name (required)
 */
export const getByName = async (req, res) => {
  try {
    const name = req.query.name || req.params.name;

    if (!name) return res.status(400).json({ status: false, message: 'Name is required' });

    const regex = new RegExp(`^${name.trim()}$`, 'i');
    const item = await EkadashInfo.findOne({ name: regex }).lean();

    if (!item) return res.status(404).json({ status: false, message: 'Ekadashi info not found' });

    res.json({
      status: true,
      data: {
        ...item,
        id: item._id
      }
    });
  } catch (err) {
    logger.error(`getByName ekadashInfo err: ${err}`);
    res.status(500).json({ status: false, message: 'Error fetching ekadashi info' });
  }
};
