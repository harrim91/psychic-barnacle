import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import colours from '../constants/colours';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = props => (
  <View style={styles.container}>
    <Text>{props.text}</Text>
  </View>
);

App.propTypes = {
  text: PropTypes.string.isRequired,
};

export default App;

