import config from '../../config/config.js';
import logger from '../../utils/logger.js';

export const sendPushNotification = async (devicesIds, dataMessage) => {
  if (!devicesIds) return;
  const userIdsArray = Array.isArray(devicesIds) ? devicesIds : [devicesIds];
  if (!userIdsArray.length) return;

  console.log(' sendPushNotification: >>>>>>', devicesIds, dataMessage);
  const url = 'https://api.onesignal.com/notifications?c=push';
  const headers = {
    accept: 'application/json',
    Authorization: config.oneSignalRestApiKey,
    'content-type': 'application/json'
  };

  const body = {
    app_id: config.oneSignalAppId,
    include_external_user_ids: userIdsArray,
    contents: { en: dataMessage.message || 'You have a new notification!' },
    headings: { en: dataMessage.title || 'New Notification' },
    data: dataMessage.data || {}, // Include custom data here
    channel_for_external_user_ids: 'push'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('Notification sent successfully:', data);
    return data;
  } catch (error) {
    logger.error(`Error sending notification: ${error.message}`);
  }
};
