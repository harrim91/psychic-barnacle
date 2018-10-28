import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import colors from '../colors';

const styles = StyleSheet.create({
  label: { color: colors.grey },
});

const FILTERED_TABS = ['Login', 'SignUp'];
const parseRouteName = name => name.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1');

const CustomTabBar = ({ navigation }) => (
  <Footer>
    <FooterTab>
      {navigation.state.routes
        .filter(({ routeName }) => !FILTERED_TABS.includes(routeName))
        .map(({ routeName, key }) => (
          <Button key={key}>
            <Text style={styles.label}>{parseRouteName(routeName)}</Text>
          </Button>
        ))}
    </FooterTab>
  </Footer>
);


export default CustomTabBar;
