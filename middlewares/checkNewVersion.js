import currentVersion from '../package.json';

const checkNewVersion = (req, res, next) => {
  const clientVersion = req.body.clientVersion;
  // if (clientVersion < currentVersion.version || clientVersion === undefined)
  //   return res.json({status: false, needUpd: true, message: 'обновите пожалуйста приложение.'});
  next();
};

export default checkNewVersion;
