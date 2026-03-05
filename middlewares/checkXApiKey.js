import config from '../config/config.js';

const checkXApiKey = (req, res, next) => {
  if (req.headers['x-api-key'] !== config.serverKey) return res.status(404).end();
  next();
};
export default checkXApiKey;
