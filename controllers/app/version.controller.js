import semver from 'semver';
import appVersions from '../../config/appVersions.config.js';
import { resolveSuggestionLanguage } from '../../utils/i18n.helpers.js';

const PLATFORMS = ['ios', 'android'];

export const getVersionStatus = (req, res) => {
  const { version, platform, build } = req.query;

  if (!version || typeof version !== 'string') {
    return res.status(400).json({ message: 'Query parameter "version" is required' });
  }

  const coerced = semver.coerce(version);
  if (!coerced) {
    return res.status(400).json({ message: 'Invalid semver in "version"' });
  }

  const normalizedPlatform = String(platform || '').toLowerCase();
  if (!PLATFORMS.includes(normalizedPlatform)) {
    return res
      .status(400)
      .json({ message: 'Query parameter "platform" must be "ios" or "android"' });
  }

  if (build !== undefined && build !== null && build !== '') {
    // reserved for future build-based rules
  }

  const clientVersion = coerced.version;
  const platformConfig = appVersions[normalizedPlatform];
  const { minVersion, latestVersion, storeUrl } = platformConfig;

  const updateRequired = semver.lt(clientVersion, minVersion);
  const updateRecommended = !updateRequired && semver.lt(clientVersion, latestVersion);

  const message =
    appVersions.message[resolveSuggestionLanguage(res.locals.language)] ?? appVersions.message.en;

  return res.json({
    updateRequired,
    updateRecommended,
    latestVersion,
    minVersion,
    storeUrl,
    message
  });
};
