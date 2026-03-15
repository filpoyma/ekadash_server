import EkadashInfo from '../../models/ekadashInfo.js';
import { getNotificationsVariants } from '../../constants/app.constants.js';
import { sendPushNotification } from './api.notifications.js';

// Функция отправки уведомления
export const sendNotification = async ({ users, infoEkadash }) => {
  const { name, date } = infoEkadash;
  const ekadashInfo = await EkadashInfo.findOne({ name }, null, { lean: true });
  if (!ekadashInfo) return;

  const devicesIdsRu = users.filter((user) => user.language === 'ru').map((user) => user.deviceId);
  const devicesIdsEn = users.filter((user) => user.language === 'en').map((user) => user.deviceId);
  const devicesIdsHi = users.filter((user) => user.language === 'hi').map((user) => user.deviceId);
  sendPushNotification(
    devicesIdsRu,
    getNotificationsVariants('ru', date, ekadashInfo.name_ru, ekadashInfo._id, ekadashInfo.name)
  ).catch(console.error);
  sendPushNotification(
    devicesIdsEn,
    getNotificationsVariants('en', date, ekadashInfo.name_en, ekadashInfo._id, ekadashInfo.name)
  ).catch(console.error);
  sendPushNotification(
    devicesIdsHi,
    getNotificationsVariants('hi', date, ekadashInfo.name_hi, ekadashInfo._id, ekadashInfo.name)
  ).catch(console.error);
};
