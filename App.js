import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { AddJourney } from './src/screens';
import { Container, PushNotifications } from './src/components';

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});

const RootStack = createBottomTabNavigator({
  AddJourney: {
    screen: AddJourney,
  },
},
{
  initialRouteName: 'AddJourney',
});

const Main = () => (
  <Container styles={[styles.container]}>
    <PushNotifications />
    <RootStack />
  </Container>
);


export default () => <Main />;
