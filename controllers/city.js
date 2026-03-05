import City from '../models/city.js';
import logger from '../utils/logger.js';

export const getByName = async (req, res) => {
  try {
    const { name } = req.query; // Assuming the search query is passed as a query parameter
    const regex = new RegExp(`^${name}`, 'i');

    const cities = await City.find({
      $or: [{ slug: regex }, { name: regex }]
    }).limit(20);

    res.json(cities);
  } catch (err) {
    logger.error(`Error searching cities: ${err}`);
    res.status(500).send('Internal Server Error');
  }
};
