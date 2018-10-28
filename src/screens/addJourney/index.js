import React from 'react';
import { Text, StyleSheet } from 'react-native';
import moment from 'moment';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
import Select from 'react-native-picker-select';
import {
  Container, Content, Header, Button,
} from 'native-base';
import stations from '../../data/stations';
import operators from '../../data/operators';

const styles = StyleSheet.create({
  datePicker: {
    width: '100%',
  },
});

class AddJourney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      end: null,
      time: null,
      operator: null,
      message: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  handleSubmit() {
    const {
      start,
      end,
      time,
      operator,
    } = this.state;
    axios.post('/journeys', {
      start,
      end,
      operator,
      time: moment(time).utc().unix(),
    }).then(() => {
      this.setState({
        start: null,
        end: null,
        time: null,
        operator: null,
        message: 'Journey Added Successfully',
      }, () => {
        setTimeout(() => {
          this.setState({ message: '' });
        }, 5000);
      });
    }).catch(() => {
      this.setState({
        message: 'Something went wrong',
      }, () => {
        setTimeout(() => {
          this.setState({ message: '' });
        }, 5000);
      });
    });
  }

  render() {
    const {
      start, end, time, operator, message,
    } = this.state;

    return (
      <Container>
        <Header>
          <Text style={{
            flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: 25, color: '#fff', padding: 10,
          }}
          >Track My Journey
          </Text>
        </Header>
        <Content>
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
          <Text>Operator:</Text>
          <Select
            hideDoneBar
            placeholder={{ label: 'Select operator', value: null }}
            items={operators.map(({ name, code }) => ({
              key: code,
              label: name,
              value: code,
            }))}
            value={operator}
            onValueChange={value => this.handleChange('operator', value)}
          />
          <Button full onPress={this.handleSubmit}><Text style={{ color: '#fff' }}>Save</Text></Button>
          {message ? <Text>{message}</Text> : null}
        </Content>
      </Container>
    );
  }
}

export default AddJourney;
