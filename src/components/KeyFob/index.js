/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import Loader from '../Util/Loader'
import { StackNavigator , DrawerNavigator } from 'react-navigation';
import ProgressBar from 'react-native-progress/Bar';
//import DrawerItem from '../Util/DrawerItem' 

type Props = {};

export default class KeyFob extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isHidden: false,
      progress: 0,
    };
  }
  static navigationOptions = ({ navigation }) => {
    return{
      headerTitle: "Home",
      headerStyle: {
        backgroundColor: '#193370',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: (
        <TouchableOpacity onPress={() =>     navigation.navigate('DrawerOpen')}>
              <Image style={{marginLeft: 10, padding:5, width: 25, height: 25}}  source={require('../Util/img/nav.png')} />
        </TouchableOpacity>
      ),  
    }
  };
  animate() {
    let progress = 0;
    this.setState({ progress });
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random() / 5;
        if (progress > 1.2) {
          progress = 0;
        }
        this.setState({ progress });
      }, 500);
  }
  componentDidMount() {
    this.animate();
  }
  unlockPress = (lockType) => {
    this.setState({
      loading: true,
      processing : '',
      isHidden: true,
    });
    var url = 'http://10.0.2.2:3000/keyfob';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'access_token',
      },
      body: "{type:"+lockType+"}",
    }).then((response) => {
        this.setState({
          loading: false,
        });
       if(response.status){
        this.setState({
          processing: setInterval(this.pollStatusLock, 5000),
          isHidden: true,
        });

       }

       else{
         alert("Something went wrong !");
       }
      })
      .catch((error) => {
        this.setState({
          loading: false,
          isHidden: false,         
        });
        alert("Server Error !"+error);
      }); 
    
  }
  pollStatusLock = () => {
    console.log("I am polling");
    var url = 'http://10.0.2.2:3000/keyfob?type=LOCK';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'access_token',
      },
    }).then(response => response.json()).
      then((response) => {  
       if(response.status == 'in_progress' ){
       }
       else if(response.status == 'completed') {
        clearInterval(this.state.processing);
        this.setState({
          isHidden: false,         
        });
       }
       else{
         console.log("Something went wrong !");
       }
      })
      .catch((error) => {
        
        alert("Server Error !"+error);
      }); 
  }
  render() {
    return (
      <View style={styles.container}>
          <Loader
          loading={this.state.loading} />
          {this.state.isHidden ? <ProgressBar style= {styles.prog} progress={this.state.progress} width={200} color={"#193370"}/> : null}

          <TouchableHighlight
            style={styles.button}
            onPress={() => {this.unlockPress("lock")}}
            disabled={false}
            underlayColor={'#b9ccee'}>
            <Image
              style={styles.image}
              source={require('./img/lock.png')} />
          </TouchableHighlight>
          <View style={{ height: 88 }} />
          <TouchableHighlight
            style={styles.button}
            onPress={() => {this.unlockPress("unlock")}}
            disabled={false}
            underlayColor={'#b9ccee'}>
            <Image
              style={styles.image}
              source={require('./img/unlock.png')} />
          </TouchableHighlight>
          
      </View>
    );
  }
}

/* const Drawer = DrawerNavigator(
  {
    Main: { screen: KeyFob }
  },
  {
    contentComponent: DrawerItem,
    drawerWidth: 200
  }
); */

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 4,
    borderColor: '#27467f',
    borderRadius: 100,
    height: 100,
    justifyContent: 'center',
    padding: 8,
    width: 100,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f5Fcff',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    tintColor: '#5e81bc'
  },
  prog: {
    marginBottom: 50,
  }
});
