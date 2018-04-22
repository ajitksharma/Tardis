
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StackNavigator , DrawerNavigator } from 'react-navigation';


export default class Manual extends Component<Props> {
    constructor(props) {
      super(props);
      this.state = {
        //loading: false,
      };
    }
    static navigationOptions = ({ navigation }) => {
        return{
          headerTitle: "Manual",
          headerLeft: (
            <TouchableOpacity onPress={() =>     navigation.navigate('DrawerOpen')}>
                  <Image style={{marginLeft: 10, padding:5, width: 25, height: 25}}  source={require('../Util/img/nav.png')} />
            </TouchableOpacity>
          ), 
        }
      };
    render () {
        return (
            <View style={{padding: 50}}>
            <Text>
                Page1
            </Text>
            </View>
        );
    }
}
