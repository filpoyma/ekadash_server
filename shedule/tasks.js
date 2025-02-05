import Ekadash from '../models/ekadash.js';
import { sendNotification } from '../controllers/notifications/push.controller.js';
import dayjs from 'dayjs';
import User from '../models/user.js';

export const ekadashiPushNotificationsSender = async () => {
  const users = await User.find({ notifiedToday: false }, null, { lean: true });

  const now = dayjs();
  const year = now.year();
  const ekadash = await Ekadash.findOne({ year });
  const pushNotifUsers = [];
  const infoEkadash = { name: '', date: '' };

  for (const user of users) {
    const nowUserTz = dayjs().tz(user.timezone);
    // Проверяем, 11:00 ли сейчас по времени пользователя
    if (nowUserTz.format('HH:mm') !== '08:47') continue;

    const daysRemind = user.daysRemindPush;

    // Проверяем Экадаши на ближайшие daysRemind дней
    for (let i = 0; i < daysRemind; i++) {
      const checkDate = nowUserTz.add(i, 'day');
      // const day = checkDate.date().toString();
      const day = '8';
      const month = checkDate.format('MMM').toLowerCase();

      if (ekadash.months[month] && ekadash.months[month].get(day)) {
        const dayInfo = ekadash.months[month].get(day);
        infoEkadash.name = dayInfo.ekadasi_name;
        infoEkadash.date = checkDate.format('DD.MM.YYYY');

        pushNotifUsers.push(user);
        break; // Прерываем цикл, так как нашли ближайший Экадаши
      }
    }
  }
  if (pushNotifUsers.length) {
    await sendNotification({ users: pushNotifUsers, infoEkadash });
    // await User.updateMany(
    //   { _id: { $in: pushNotifUsers.map((user) => user._id) } },
    //   { notifiedToday: true }
    // );
  }
};

export const clearNotifiedToday = async () => {
  await User.updateMany({}, { notifiedToday: false });
};
