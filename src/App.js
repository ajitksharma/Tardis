/**
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator , DrawerNavigator } from 'react-navigation';
import Login from './components/Login/index';
import KeyFob from './components/KeyFob/index';
import DrawerItem from './components/Util/DrawerItem' 
import Manual from './components/Manual/manual'
import DevicePage from './components/DeviceInfo/deviceInfo'
import DatabasePage from './components/Database/database'
type Props = {};



export default class App extends Component<Props> {
  render() {
    console.disableYellowBox = true;
    return (
      <Drawer/>
    );
  }
}

const AppNavigator = StackNavigator({
  LoginScreen: { screen: Login },
  KeyFobScreen: { screen: KeyFob},
  ManualScreen: {screen: Manual},
  DevicePageScreen: {screen: DevicePage},
  DatabasePageScreen: {screen: DatabasePage},
},);

const Drawer = DrawerNavigator(
  {
    Main: { screen: AppNavigator }
  },
  {
    contentComponent: DrawerItem,
    drawerWidth: 200
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
