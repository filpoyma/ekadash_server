import City from '../models/city.js';
import logger from '../utils/logger.js';

export const getByName = async (req, res) => {
  try {
    const { name } = req.query;


    res.json(cities);
  } catch (err) {
    logger.error(`Error searching cities: ${err}`);
    res.status(500).send(err);
  }
};
