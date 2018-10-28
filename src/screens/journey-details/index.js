import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, List, ListItem, Body } from 'native-base';
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
    console.log(journey);

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
      <ScrollView>
        <Text>Journey: {start} - {end}</Text>
        <Text>Status: {getStatus(navigation.getParam('status'))}</Text>
        <Text>Operator: {journey.departure.operator}</Text>
        <Text>Platform: {journey.departure.platform || 'Unknown'}</Text>
        <Text>Expected Departure: {journey.departure.expectedDeparture || 'Unknown'}</Text>
        <Text>Expected Arrival: {journey.departure.expectedArrival || 'Unknown'}</Text>
        <Text>Alternate Routes:</Text>
        <List>
          {journey.alternateRoutes.map((route, i)=> (
            <ListItem key={i}>
              <Body>
                <Text>Duration: {route.duration}</Text>
                <Text>Depart: {route.departureTime}</Text>
                <Text>Arrive: {route.arrivalTime}</Text>
                <Text>Modes: {route.modes.join(', ')}</Text>
              </Body>
            </ListItem>
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default JourneyDetails;
