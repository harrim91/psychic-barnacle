import React from 'react';
import PropTypes from 'prop-types';
import { View, Picker, Text, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Select = ({ options, selected, label, onValueChange }) => (
  <View style={style.container}>
    <Text>{label}</Text>
    <Picker onValueChange={onValueChange} selectedValue={selected}>
      {options.map(option => <Picker.Item key={option.value} {...option} />)}
    </Picker>
  </View>
);

Select.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  selected: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

Select.defaultProps = {
  options: [],
};

export default Select;
