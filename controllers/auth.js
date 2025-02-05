import User from '../models/user.js';

export const signUp = async (req, res) => {
  const { deviceId, language, timezone } = req.body;
  try {
    let user = await User.findOne({ deviceId }, null, { lean: true });
    if (user) return res.json(user);
    user = new User({ deviceId, language, timezone });
    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Error create User:', err);
    res.status(500).send(`Error create User: ${err.message}`);
  }
};

export const signIn = async (req, res) => {
  const { deviceId } = req.body;
  try {
    let user = await User.findOne({ deviceId }, null, { lean: true });
    if (user) return res.json(user);
    return res.json(null);
  } catch (err) {
    console.error('Error create User:', err);
    res.status(500).send(err);
  }
};
