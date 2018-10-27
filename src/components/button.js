import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import colors from './colors';

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    width: '100%',
    margin: 5,
    padding: 10,
  },
  text: {
    padding: 5,
    textAlign: 'center',
  },
});

const Button = ({ onPress, text }) => (
  <View style={style.container}>
    <TouchableOpacity onPress={onPress}>
      <Text style={style.text}>
        {text}
      </Text>
    </TouchableOpacity>
  </View>
);

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

Button.defaultProps = {
  text: '',
};

export default Button;
