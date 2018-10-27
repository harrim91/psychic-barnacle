import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
  textInput: {
    borderColor: colors.grey,
    borderWidth: StyleSheet.hairlineWidth,
    width: '100%',
    margin: 5,
    padding: 10,
  },
});

const TextInput = props => (
  <RNTextInput {...props} style={styles.textInput} />
);

TextInput.propTypes = { ...RNTextInput.propTypes };

export default TextInput;
