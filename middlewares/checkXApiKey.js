const checkXApiKey = (req, res, next) => {
  if(req.headers['x-api-key'] !== process.env.SERVER_KEY) return res.status(404).end();
  next();
}
module.exports = checkXApiKey;
