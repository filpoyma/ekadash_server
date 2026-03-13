import Ekadashi from '../models/ekadashi.js';
import { sendNotification } from '../controllers/notifications/push.controller.js';
import dayjs from 'dayjs';
import User from '../models/user.js';

export const ekadashiPushNotificationsSender = async () => {
  const dateKey = (y, m, d) => `${y}-${m}-${d}`;

  const users = await User.find({ notifiedToday: false, daysRemindPush: { $gt: 0 } }, null, {
    lean: true
  });

  const now = dayjs();
  const year = now.year();
  const ekadashiDays = await Ekadashi.find({ year: { $in: [year, year + 1] } }, null, {
    lean: true
  });
  const ekadashiByDate = new Map(ekadashiDays.map((d) => [dateKey(d.year, d.month, d.day), d]));
  const pushNotifUsers = [];
  const infoEkadash = { name: '', date: '' };
  for (const user of users) {
    const nowUserTz = dayjs().tz(user.timezone);
    if (nowUserTz.format('HH:mm') !== '11:11') continue;

    const daysRemind = user.daysRemindPush;

    for (let i = 1; i <= daysRemind; i++) {
      const checkDate = nowUserTz.add(i, 'day');
      const y = checkDate.year();
      const m = checkDate.month() + 1;
      const d = checkDate.date();
      const dayRecord = ekadashiByDate.get(dateKey(y, m, d));

      if (dayRecord) {
        infoEkadash.name = dayRecord.ekadasi_name;
        infoEkadash.date = checkDate.format('DD.MM.YYYY');
        pushNotifUsers.push(user);
        break;
      }
    }
  }

  if (pushNotifUsers.length) {
    await sendNotification({ users: pushNotifUsers, infoEkadash });
    await User.updateMany(
      { _id: { $in: pushNotifUsers.map((u) => u._id) } },
      { notifiedToday: true }
    );
  }
};

export const clearNotifiedToday = async () => {
  await User.updateMany({}, { notifiedToday: false });
};
