import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import colors from '../colors';

const styles = StyleSheet.create({
  label: {
    ...Platform.select({
      android: { color: colors.grey },
      ios: { color: colors.black },
    }),
  },
});

const FILTERED_TABS = ['Login', 'SignUp', 'JourneyDetails'];
const parseRouteName = name => name.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1');

const CustomTabBar = ({ navigation }) => (
  <Footer>
    <FooterTab>
      {navigation.state.routes
        .filter(({ routeName }) => !FILTERED_TABS.includes(routeName))
        .map(({ routeName, key }) => (
          <Button
            onPress={() => {
              navigation.navigate(key);
            }}
            key={key}
          >
            <Text style={styles.label}>{parseRouteName(routeName)}</Text>
          </Button>
        ))}
    </FooterTab>
  </Footer>
);


export default CustomTabBar;
