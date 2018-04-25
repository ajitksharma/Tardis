import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { NavigationActions } from "react-navigation";
import Login from '../Login/index';

class DrawerItem extends Component {
  _navigate(route) {
    return this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: `${route}` })]
      })
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            this._navigate("KeyFobScreen", { isStatusBarHidden: false })}
        >
          <Text style={styles.menuItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            this._navigate("ManualScreen", { isStatusBarHidden: false })}
        >
          <Text style={styles.menuItemText}>Manual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            this._navigate("DatabasePageScreen", { isStatusBarHidden: false })}
        >
          <Text style={styles.menuItemText}>DatabasePage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            this._navigate("DevicePageScreen", { isStatusBarHidden: false })}
        >
          <Text style={styles.menuItemText}>DevicePage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => this._navigate("LoginScreen", { isStatusBarHidden: false })}
        >
          <Text style={styles.menuItemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "#193370",
  },
  menuItem: {
    padding: 10,
    justifyContent: "center",
    marginBottom: 2
  },
  menuItemText: {
    fontSize: 20,
    color: "#ffffff",
  }
});

DrawerItem.defaultProps = {};

DrawerItem.propTypes = {};

export default DrawerItem;