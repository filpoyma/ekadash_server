import User from '../models/user.js';
import { sendPushNotification } from './sendPushNotifications.js';

export const getUser = async (req, res) => {
  const { deviceId } = req.params;
  try {
    let user = await User.findOne({ deviceId }, null, { lean: true });
    if (user) return res.json(user);
    res.json(null);
  } catch (err) {
    console.error('Error get User:', err);
    res.status(500).send(err);
  }
};

export const updateUser = async (req, res) => {
  const { deviceId } = res.locals;
  try {
    const updData = await User.updateOne({ deviceId }, req.body, { lean: true });
    // console.log('file-auth.js updatedUser:', updData);
    const user = await User.findOne({ deviceId });
    console.log('file-user.js user:', user);
    res.json(updData);
  } catch (err) {
    console.error('Error create User:', err);
    res.status(500).send(err);
  }
};
