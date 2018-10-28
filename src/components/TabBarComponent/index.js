import React from 'react';
import { Text, Platform } from 'react-native';
import {
  Footer, FooterTab, Button, Icon,
} from 'native-base';
import colors from '../colors';

const FILTERED_TABS = ['Login', 'SignUp', 'JourneyDetails'];
const parseRouteName = name => name.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1');

const CustomTabBar = ({ navigation }) => (
  <Footer>
    <FooterTab>
      {navigation.state.routes
        .filter(({ routeName }) => !FILTERED_TABS.includes(routeName))
        .map(({ routeName, key }) => {
          // const last = navigation.state.routes[0].routes.length - 1;
          //  = navigation.state.routes[0].routes[last].routeName;
          const curentScreen = navigation.state.index;
          const currentRouteName = navigation.state.routes[curentScreen].routeName;
          let color = Platform.select({
            android: { color: colors.grey },
            ios: { color: colors.black },
          });
          let fontWeight = 'normal';

          if (currentRouteName === routeName) {
            color = { color: '#660000' };
            fontWeight = 'bold';
          }

          return (
            <Button
              onPress={() => {
                navigation.navigate(key);
              }}
              key={key}
            >
              {routeName === 'LovedOnes' ? (<Icon style={{ color: color.color }} name="heart" />) : (
                <Text style={{ color: color.color, fontWeight }}>{parseRouteName(routeName)}</Text>)}

            </Button>
          );
        })}
    </FooterTab>
  </Footer>
);


export default CustomTabBar;
