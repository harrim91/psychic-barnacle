import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Select from 'react-native-picker-select';
import { Container } from './components';
import stations from './data/stations';

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      end: null,
      time: null,
    };
  }

  handleChange(key, value) {
    this.setState({ [key]: value }, () => {
      console.log(this.state);
    });
  }

  render() {
    const { user } = this.props;
    const { start, end, time } = this.state;

    return (
      <Container styles={[styles.container]}>
        <Text>Hello {user.firstName}</Text>
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
          style={{ width: '100%' }}
          mode="datetime"
          date={time}
          placeholder="Select journey time"
          onDateChange={value => this.handleChange('time', value)}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
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
