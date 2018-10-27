import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Container = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
);

export default Container;
