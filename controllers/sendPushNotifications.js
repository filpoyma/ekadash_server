export const sendPushNotification = async () => {
  const url = 'https://api.onesignal.com/notifications?c=push';
  const headers = {
    accept: 'application/json',
    Authorization: process.env.ONESIGNAL_REST_API_KEY,
    'content-type': 'application/json'
  };

  const body = {
    app_id: process.env.ONESIGNAL_APP_ID,
    filters: [
      // Filter for users who have an active session (subscribed users)
      { field: 'last_session', relation: '>', value: '0' } // Users who have had a session in the last X days
    ],
    contents: { en: 'Hello, this is a test push notification!' },
    headings: { en: 'Test Notification' }
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
  } catch (error) {
    console.error('Error sending notification:', error.message);
  }
};
