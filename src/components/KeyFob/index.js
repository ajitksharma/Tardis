/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import Loader from '../Util/Loader'
type Props = {};

export default class KeyFob extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  unlockPress = () => {
    this.setState({
      loading: true,
      processing : '',
    });
    var url = 'http://10.0.2.2:3000/keyfob';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'access_token',
      },
      body: "{type:'LOCK'}",
    }).then((response) => {
        this.setState({
          loading: false,
        });
       if(response.status){
        
        this.setState({
          processing: setInterval(this.pollStatusLock, 5000)
        });

        //   clearInterval(this.state.intervalId);
        //propNavigate.navigation.navigate('KeyFobScreen');
       }
       else{
         alert("Something went wrong !");
       }
      })
      .catch((error) => {
        this.setState({
          loading: false,
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
         //clearInterval(this.state.intervalId);
        //propNavigate.navigation.navigate('KeyFobScreen');
       }
       else if(response.status == 'completed') {
        clearInterval(this.state.processing);
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
          <TouchableHighlight
            style={styles.button}
            onPress={() => {}}
            disabled={false}
            underlayColor={'#b9ccee'}>
            <Image
              style={styles.image}
              source={require('./img/lock.png')} />
          </TouchableHighlight>
          <View style={{ height: 88 }} />
          <TouchableHighlight
            style={styles.button}
            onPress={() => {this.unlockPress()}}
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
  }
});
