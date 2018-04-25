import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    NativeModules,
  } from 'react-native';
  
export default class DevicePage extends Component<Props> {
    constructor(props) {
      super(props);
      this.state = {
        firstParam:[],
        secondParam:[],
      };


    }

    componentDidMount () {
      const device = NativeModules.RNAndroidDeviceInfo;
      console.log(JSON.stringify(device));

        //console.log("Device Manufacturer", DeviceInfo.getBatteryLevel());  // e.g. Apple
       
        device.getDeviceInfo().then((deviceInfo) => {
          this.setState({
            firstParam: deviceInfo,
          });
         
        })

        
        device.getBatteryInfo().then((batteryInfo) => {
          this.setState({
            secondParam: batteryInfo,
          });         
        })        
      }
    Capitalize(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    static navigationOptions = ({ navigation }) => {
        return{
          headerTitle: "Device Info",
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
    }

    render () {
        console.log(this.state.firstParam);
        console.log(this.state.secondParam);

        return (
          <View style={styles.MainContainer}> 
          <View style={{flex:1, flexDirection: 'column', marginBottom: 15}} >
            <View style={{flexDirection: 'row',marginBottom: 10}}>
              <Text style={styles.leftTextViewContainer}>Device Type :</Text>
              <Text style={styles.rightTextViewContainer} >{this.Capitalize(this.state.firstParam.deviceType)}</Text>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={styles.leftTextViewContainer}>Build :</Text>
              <Text style={styles.rightTextViewContainer} > {this.Capitalize(this.state.firstParam.buildBrand)}</Text>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={styles.leftTextViewContainer}>OS Version :</Text>
              <Text style={styles.rightTextViewContainer} >{this.Capitalize(this.state.firstParam.osVersion)}</Text>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={styles.leftTextViewContainer}> OS Name :</Text>
              <Text style={styles.rightTextViewContainer} >{this.Capitalize(this.state.firstParam.osCodename)}</Text>
            </View>

             <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={styles.leftTextViewContainer}> Device :</Text>
              <Text style={styles.rightTextViewContainer} >{this.Capitalize(this.state.firstParam.device)}</Text>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={styles.leftTextViewContainer}> Model :</Text>
              <Text style={styles.rightTextViewContainer} >{this.Capitalize(this.state.firstParam.model)}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={styles.leftTextViewContainer}> PhoneType :</Text>
              <Text style={styles.rightTextViewContainer} >{this.Capitalize(this.state.firstParam.phoneType)}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={styles.leftTextViewContainer}> Orientation :</Text>
              <Text style={styles.rightTextViewContainer} >{this.Capitalize(this.state.firstParam.orientation)}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={styles.leftTextViewContainer}> Battery :</Text>
              <Text style={styles.rightTextViewContainer} >{this.Capitalize(this.state.secondParam.batteryHealth)}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={styles.leftTextViewContainer}> Device :</Text>
              <Text style={styles.rightTextViewContainer} >{this.Capitalize(this.state.secondParam.batteryPercentage)}</Text>
            </View>


          </View>
          </View>
        )
    }

}

const styles = StyleSheet.create({

  MainContainer : {

    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex:1,
    backgroundColor: '#fafafa',
    padding: 20,
  
    },
  
    leftTextViewContainer: {
  
     textAlignVertical:'center',
    // padding:10,
     marginLeft: 5,
     fontSize: 18,
     color: '#000',
     fontWeight: 'bold',
  
  
    },
    rightTextViewContainer: {
  
      textAlignVertical:'center',
     // padding:10,
     marginLeft: 5,
      fontSize: 16,
      color: '#000',
   
     }
  });