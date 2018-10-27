import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
} from 'react-native';
import { Notifications } from 'expo';
import DatePicker from 'react-native-datepicker';
import Select from 'react-native-picker-select';
import Toaster from 'react-native-toaster';
import moment from 'moment';
import axios from 'axios';
import registerForPushNotificationsAsync from './lib/registerForPushNotifications';
import { Container, Button } from './components';
import stations from './data/stations';

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  datePicker: {
    width: '100%',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      end: null,
      time: null,
      notification: null,
    };

    this.handleNotification = this.handleNotification.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange(key, value) {
    this.setState({ [key]: value }, () => {
      console.log(this.state);
    });
  }

  handleSubmit() {
    const { start, end, time } = this.state;
    axios.post('/journeys', {
      start,
      end,
      time: moment(time).utc().unix(),
    });
  }

  render() {
    const {
      start,
      end,
      time,
      notification,
    } = this.state;

    return (
      <Container styles={[styles.container]}>
        {notification ? (<Toaster message={notification} />) : null}
        <Text>Add Journey</Text>
        <Text>From:</Text>
        <Select
          hideDoneBar
          placeholder={{ label: 'Select start station', value: null }}
          items={stations.map(({ name, code }) => ({
            key: code,
            label: `${name} (${code})`,
            value: code,
          }))}
          value={start}
          onValueChange={value => this.handleChange('start', value)}
        />
        <Text>To:</Text>
        <Select
          hideDoneBar
          placeholder={{ label: 'Select end station', value: null }}
          items={stations.map(({ name, code }) => ({
            key: code,
            label: `${name} (${code})`,
            value: code,
          }))}
          value={end}
          onValueChange={value => this.handleChange('end', value)}
        />
        <Text>Time:</Text>
        <DatePicker
          style={styles.datePicker}
          mode="datetime"
          date={time}
          placeholder="Select journey time"
          onDateChange={value => this.handleChange('time', value)}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
        />
        <Button onPress={this.handleSubmit} text="Submit Journey" />
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
