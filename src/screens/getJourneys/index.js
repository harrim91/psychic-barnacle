import React from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  List, ListItem, Body, Right, Button,
} from 'native-base';
import moment from 'moment';
import axios from 'axios';
import get from 'lodash.get';
import plur from 'plur';
import stations from '../../data/stations';

const getFriendlyJourneyLabel = (startingStation, endingStation) => {
  const start = stations.find(s => s.code === startingStation);
  const end = stations.find(s => s.code === endingStation);
  return `${start.name} to ${end.name}`;
};

const getFriendlyTimeLabel = timestamp => moment.unix(timestamp).format('llll');

class GetJourneys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      journeys: [],
    };
    this.getLatestJourneys = this.getLatestJourneys.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.tabRefreshListener = navigation.addListener(
      'didFocus',
      this.getLatestJourneys,
    );
  }

  componentWillUnmount() {
    this.tabRefreshListener.remove();
  }

  getLatestJourneys() {
    axios.get('/journeys')
      .then((response) => {
        const journeys = response.data;

        this.setState({ journeys });
      })
      .catch(e => console.log(e));
  }

  render() {
    const { journeys } = this.state;
    const { navigation } = this.props;

    return (
      <ScrollView>
        <List>
          {journeys.map((journey) => {
            const aimedDeparture = get(journey, 'departures.all[0].aimed_departure_time');
            const expectedDeparture = get(journey, 'departures.all[0].expected_departure_time');
            let status = '';

            if (aimedDeparture && expectedDeparture) {
              const aimedTime = new moment(aimedDeparture, 'HH:mm');
              const expectedTime = new moment(expectedDeparture, 'HH:mm');

              if (!journey.departures) {
                status = 'Unknown';
              } else if (journey.departures.all.length === 0 || moment.unix(journey.time).isBefore(aimedTime)) {
                status = 'Departed';
              } else if (journey.departures.all[0].status === 'BUS') {
                status = 'Bus';
              } else if (aimedTime.isBefore(expectedTime)) {
              // early
                status = 'On Time';
              } else if (aimedTime.isSame(expectedTime)) {
              // on time
                status = 'On Time';
              } else {
              // late
                const mins = Math.round(Math.abs(aimedTime.diff(expectedTime) / 60 / 1000));
                status = `'${mins}${plur('min', 'mins', mins)}`;
              }
            }

            return (
              <ListItem key={journey._id}>
                <Body>
                  <TouchableOpacity onPress={() => ['Unknown', 'Departed'].includes(status) || navigation.navigate('JourneyDetails', { id: journey._id, status })}>
                    <Text>{getFriendlyJourneyLabel(journey.start, journey.end)}</Text>
                    <Text note numberOfLines={2}>{getFriendlyTimeLabel(journey.time)}</Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>{status}</Text>
                  </Button>
                </Right>
              </ListItem>
            );
          })}
        </List>
      </ScrollView>
    );
  }
}

export default GetJourneys;
