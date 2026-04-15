const setLanguage = (req, res, next) => {
  const language = req.headers['x-lang']; //'ru' 'en' 'hi'

  if (language) res.locals.language = language;
  next();
};
export default setLanguage;
