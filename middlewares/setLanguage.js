const setLanguage = (req, res, next) => {
  const language = req.headers['x-lang'];

  if (language) res.locals.language = language;
  next();
};
export default setLanguage;
