const checkAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ message: 'Authorization header is missing' });
  if (authHeader.startsWith('Bearer ')) res.locals.deviceId = authHeader.split(' ')[1]; // Извлекаем токен
  next();
};
export default checkAuth;
