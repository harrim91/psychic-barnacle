import React from 'react';
import { View, Text } from 'native-base';
import axios from 'axios';
import stations from '../../data/stations';

const getStatus = status => (status.toLowerCase() === 'bus' ? 'Rail Replacement' : status);

class JourneyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      journey: null,
      message: 'Loading...',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    axios.get(`/journeys/${navigation.getParam('id')}`)
      .then(({ data }) => this.setState({ journey: data }))
      .catch((error) => {
        console.log(error);
        this.setState({ message: 'Unable to fetch data' });
      });
  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;
    const lastId = navigation.getParam('id');
    const nextId = nextProps.navigation.getParam('id');
    if (lastId !== nextId) {
      axios.get(`/journeys/${nextId}`)
        .then(({ data }) => this.setState({ journey: data }))
        .catch((error) => {
          console.log(error);
          this.setState({ message: 'Unable to fetch data' });
        });
    }
  }

  render() {
    const { navigation } = this.props;
    const { message, journey } = this.state;
    if (journey === null) {
      return (
        <View>
          <Text>{message}</Text>
        </View>
      );
    }
    const start = stations.find(station => station.code === journey.start).name;
    const end = stations.find(station => station.code === journey.end).name;
    return (
      <View>
        <Text>Journey: {start} - {end}</Text>
        <Text>Status: {getStatus(navigation.getParam('status'))}</Text>

      </View>
    );
  }
}

export default JourneyDetails;
