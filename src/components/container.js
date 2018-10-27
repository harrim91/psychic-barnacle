import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

const rootStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Container = ({ children, styles }) => (
  <View
    style={[
      rootStyles.container,
      ...styles,
    ]}
  >
    {children}
  </View>
);

Container.propTypes = {
  styles: PropTypes.arrayOf(PropTypes.number),
};

Container.defaultProps = {
  styles: [],
};

export default Container;
