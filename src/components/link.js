import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
  text: {
    color: colors.blue,
    textDecorationLine: 'underline',
  },
});

const Link = ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

Link.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Link;
