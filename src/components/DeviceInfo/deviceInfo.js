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
      
      };


    }

    componentDidMount () {
      const device = NativeModules.RNAndroidDeviceInfo;

        //console.log("Device Manufacturer", DeviceInfo.getBatteryLevel());  // e.g. Apple
        
        console.log("Device Model", device.getDeviceInfo());  // e.g. iPhone
        
       // console.log("Device Name", device.getMemoryInfo());  // e.g. iPhone OS
        
        console.log("Device Version", device.getBatteryInfo());  // e.g. 9.0
        
        /* console.log("Bundle Id", DeviceInfo.getIPAddress());  // e.g. com.learnium.mobile
        
        console.log("Build Number", DeviceInfo.getMACAddress());  // e.g. 89
        
        console.log("App Version", DeviceInfo.getMaxMemory());  // e.g. 1.1.0
        
        console.log("App Version (Readable)", DeviceInfo.getPhoneNumber()); 
        console.log("App Version (Readable)", DeviceInfo.getTimezone()); 
        console.log("App Version (Readable)", DeviceInfo.getTotalMemory());  */

      }
    static navigationOptions = ({ navigation }) => {
        return{
          headerTitle: "Device Info",
          headerLeft: (
            <TouchableOpacity onPress={() =>     navigation.navigate('DrawerOpen')}>
                  <Image style={{marginLeft: 10, padding:5, width: 25, height: 25}}  source={require('../Util/img/nav.png')} />
            </TouchableOpacity>
          ),
        }
    }

    render () {

        return (
            <Text >This is Device page</Text>
        )
    }

}