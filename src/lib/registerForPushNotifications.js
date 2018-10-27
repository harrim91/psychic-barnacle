import { Permissions, Notifications } from 'expo';
import axios from 'axios';
import constants from '../constants';

const { API_URL } = constants;

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS,
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  axios.put(`${API_URL}/users/push-token`, {
    token,
  },
  {
    headers: {
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmQ0YTkyMTBmYmNiMDFiY2ZlMDBmZmUiLCJmaXJzdE5hbWUiOiJFcnNlbCIsImxhc3ROYW1lIjoiQWtlciIsImVtYWlsIjoiaGVsbG9AZXJzZWxha2VyLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFZWdTJzSFFJNmRiL1cuNjFzUXgwYWUySVVvZmhJZ2dhV3pQNnlTQVRlYVM2ekdZTHVCUFNPIiwiX192IjowLCJpYXQiOjE1NDA2NjM1ODUsImV4cCI6MTU0MDgzNjM4NX0.TbUQ1MtQjfADiDSK9dL_CaAKQEyFDo4ER3d9ZqL5U5U',
    },
  });
}

export default registerForPushNotificationsAsync;
