import React from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { createBottomTabNavigator } from 'react-navigation';
import { AddJourney, Login, SignUp } from './src/screens';
import { Container, PushNotifications, TabBarComponent } from './src/components';

axios.defaults.baseURL = 'https://hackmcr-2018-api.herokuapp.com';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});

const RootStack = createBottomTabNavigator({
  AddJourney: {
    screen: AddJourney,
  },
  Login: {
    screen: Login,
  },
  SignUp: {
    screen: SignUp,
  },
},
{
  initialRouteName: 'Login',
  tabBarComponent: ({ navigation }) => <TabBarComponent navigation={navigation} />,
});

const Main = () => (
  <Container styles={[styles.container]}>
    <PushNotifications />
    <RootStack />
  </Container>
);


export default () => <Main />;
