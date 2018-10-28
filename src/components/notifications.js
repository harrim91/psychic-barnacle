import React from 'react';
import { Notifications, Contacts } from 'expo';
import Toaster from 'react-native-toaster';
import registerForPushNotificationsAsync from '../lib/registerForPushNotifications';
import TokenManager from '../lib/token-manager';
import get from 'lodash.get';
import axios from 'axios';

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

  sendSMS = async () => {
    const selectedContact1 = await TokenManager.getData('selectedContact1');
    const selectedContact2 = await TokenManager.getData('selectedContact2');
    const selectedContact3 = await TokenManager.getData('selectedContact3');
    const message = await TokenManager.getData('message');

    const contacts = await Contacts.getContactsAsync();
    const contact1 = contacts.data.find(c => c.id === selectedContact1)
    const contactNo1 = get(contact1, 'phoneNumbers[0].number')
    const contact2 = contacts.data.find(c => c.id === selectedContact2)
    const contactNo2 = get(contact2, 'phoneNumbers[0].number')
    const contact3 = contacts.data.find(c => c.id === selectedContact3)
    const contactNo3 = get(contact3, 'phoneNumbers[0].number')

    if(contactNo1) {
      axios.post('/sms/send', {
        "number": contactNo1,
        message
      })
    }

    if(contactNo2) {
      axios.post('/sms/send', {
        "number": contactNo2,
        message
      })
    }

    if(contactNo3) {
      axios.post('/sms/send', {
        "number": contactNo3,
        message
      })
    }
  }

  handleNotification(notification) {
    console.log(notification);
    const customNotification = {
      text: notification.data.body,
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

    this.sendSMS()
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
