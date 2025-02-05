export const sendPushNotification = async (devicesIds, dataMessage) => {
  if (!devicesIds) return;
  const userIdsArray = Array.isArray(devicesIds) ? devicesIds : [devicesIds];
  if (!userIdsArray.length) return;

  console.log(' sendPushNotification: >>>>>>', devicesIds, dataMessage);
  const url = 'https://api.onesignal.com/notifications?c=push';
  const headers = {
    accept: 'application/json',
    Authorization: process.env.ONESIGNAL_REST_API_KEY,
    'content-type': 'application/json'
  };

  const body = {
    app_id: process.env.ONESIGNAL_APP_ID,
    include_external_user_ids: userIdsArray,
    contents: { en: dataMessage.message || 'You have a new notification!' },
    headings: { en: dataMessage.title || 'New Notification' },
    channel_for_external_user_ids: 'push'
  };

  // const body = {
  //   app_id: process.env.ONESIGNAL_APP_ID,
  //   include_external_user_ids: userIdsArray,
  //   filters: [
  //     // Filter for users who have an active session (subscribed users)
  //     { field: 'last_session', relation: '>', value: '0' } // Users who have had a session in the last X days
  //   ],
  //   contents: { en: 'Hello, this is a test push notification!' },
  //   headings: { en: 'Test Notification' }
  // };

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
    console.error('Error sending notification:', error.message);
  }
};
