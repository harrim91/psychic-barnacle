import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import Select from 'react-native-picker-select';
import Toaster from 'react-native-toaster';
import { Notifications } from 'expo';
import registerForPushNotificationsAsync from './lib/registerForPushNotifications';
import { Container } from './components';
import stations from './data/stations';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      station: null,
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

  handleStationSelect(station) {
    this.setState({ station });
  }

  render() {
    const { user } = this.props;
    const { station, notification } = this.state;

    return (
      <Container>
        {notification ? (<Toaster message={notification} />) : null}
        <Text>Hello {user.firstName}</Text>
        <Select
          placeholder={{ label: 'Stations', value: null }}
          items={stations.map(({ name, code }) => ({
            key: code,
            label: `${name} (${code})`,
            value: code,
          }))}
          value={station}
          onValueChange={v => console.log(v)}
        />
      </Container>
    );
  }
}

App.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};

export default App;
