import cron from 'node-cron';
import { clearNotifiedToday, ekadashiPushNotificationsSender } from './tasks.js';

const cronScheduleInit = () => {
  cron.schedule('* * * * *', ekadashiPushNotificationsSender);

  // Сброс `notifiedToday` в полночь (чтобы уведомления отправлялись каждый день)
  cron.schedule('0 0 * * *', clearNotifiedToday);
};

export default cronScheduleInit;
