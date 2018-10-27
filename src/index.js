import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import Select from 'react-native-picker-select';
import { Container } from './components';
import stations from './data/stations';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      station: null,
    };
  }

  handleStationSelect(station) {
    this.setState({ station });
  }

  render() {
    const { user } = this.props;
    const { station } = this.state;

    return (
      <Container>
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
