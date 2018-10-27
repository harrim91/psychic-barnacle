import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import { Permissions, Notifications } from 'expo';
import axios from 'axios';
import colours from '../constants/colours';
import Toaster, { ToastStyles } from 'react-native-toaster'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const PUSH_ENDPOINT = 'http://66d79c28.ngrok.io/users/push-token';

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
  axios.put(PUSH_ENDPOINT, {
    token,
  },
  {
    headers: {
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmQ0YTkyMTBmYmNiMDFiY2ZlMDBmZmUiLCJmaXJzdE5hbWUiOiJFcnNlbCIsImxhc3ROYW1lIjoiQWtlciIsImVtYWlsIjoiaGVsbG9AZXJzZWxha2VyLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFZWdTJzSFFJNmRiL1cuNjFzUXgwYWUySVVvZmhJZ2dhV3pQNnlTQVRlYVM2ekdZTHVCUFNPIiwiX192IjowLCJpYXQiOjE1NDA2NjM1ODUsImV4cCI6MTU0MDgzNjM4NX0.TbUQ1MtQjfADiDSK9dL_CaAKQEyFDo4ER3d9ZqL5U5U',
    },
  });
}
class App extends React.Component {
  state = {
    notification: null
  };

  componentDidMount() {
    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    const customNotification = {
      text: 'Some notification has been received',
      styles: {
        container: {
          paddingTop: 30,
          paddingLeft:5,
          paddingRight:5,
          paddingBottom:5,
          backgroundColor: 'oldlace',
        },
        text: {
          color: 'black',
          fontWeight: 'bold'
        }
      }
    }
    this.setState({notification: customNotification});
  };

  render() {
    const { notification } = this.state;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {notification && (<Toaster message={notification} />)}
      </View>
    );
  }
}

App.propTypes = {
  text: PropTypes.string.isRequired,
};

export default App;
