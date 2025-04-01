import User from '../models/user.js';
import { sendPushNotification } from './notifications/api.notifications.js';

export const setLogs = async (req, res) => {
  const { logMessage } = req.body;

  console.log(`LOGS: ${new Date().toLocaleString()}:`);
  console.dir(logMessage);
  res.json({ message: 'logs published' });
};
