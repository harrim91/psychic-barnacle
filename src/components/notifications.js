import React from 'react';
import { Notifications } from 'expo';
import Toaster from 'react-native-toaster';
import registerForPushNotificationsAsync from '../lib/registerForPushNotifications';

class PushNotifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: null,
    };

    this.handleNotification = this.handleNotification.bind(this);
  }

  componentDidMount() {
    registerForPushNotificationsAsync();
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  handleNotification(notification) {
    // todo: read notifications
    console.log(notification);

    const customNotification = {
      text: 'Some notification has been received',
      styles: {
        container: {
          paddingTop: 40,
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 5,
          backgroundColor: 'oldlace',
        },
        text: {
          color: 'black',
          fontWeight: 'bold',
        },
      },
    };
    this.setState({ notification: customNotification });
  }


  render() {
    const {
      notification,
    } = this.state;

    if (!notification) {
      return null;
    }

    return (
      <Toaster message={notification} />
    );
  }
}

export default PushNotifications;
