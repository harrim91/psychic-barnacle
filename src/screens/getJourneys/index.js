import React from 'react';
import { Text } from 'react-native';
import {
  List, ListItem, Body, Right, Button,
} from 'native-base';
import moment from 'moment';
import axios from 'axios';
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
    return (
      <List>
        {journeys.map(journey => (
          <ListItem key={journey._id}>
            <Body>
              <Text>{getFriendlyJourneyLabel(journey.start, journey.end)}</Text>
              <Text note numberOfLines={2}>{getFriendlyTimeLabel(journey.time)}</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Late by 10mins</Text>
              </Button>
            </Right>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default GetJourneys;
