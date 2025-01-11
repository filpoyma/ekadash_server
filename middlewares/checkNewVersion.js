const currentVersion  = require('../package.json').version;

exports.checkNewVersion = (req, res, next) => {
  const clientVersion = req.body.clientVersion;
  // if (clientVersion < currentVersion || clientVersion === undefined)
  //   return res.json({status: false, needUpd: true, message: 'обновите пожалуйста приложение.'});
  next();
}
