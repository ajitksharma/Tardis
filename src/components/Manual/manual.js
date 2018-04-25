
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ListView,
  StyleSheet,
  Platform,
} from 'react-native';
import { StackNavigator , DrawerNavigator } from 'react-navigation';
import Loader from '../Util/Loader'


export default class Manual extends Component<Props> {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        dataResp: [],
      };
      this.ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }
    componentDidMount(){
        this.getManualResp();

    }
    getManualResp = () =>{
        return fetch('http://10.0.2.2:3000/manual/index.json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //'authorization': 'access_token',
        },
        }).then(response => response.json()).
        then((responseJSON) => {
            console.log(responseJSON);
            //let ds =
           // console.log(ds);
           this.setState({
            loading: false,
            dataResp: responseJSON,
           });
           return responseJSON;

            console.log(this.state.dataSource);
        })
        .catch((error) => {

            alert("Server Error !"+error);
        });
       // return promise;
       // }
    }

    ListViewItemSeparator = () => {
        return (
          <View
            style={{

              height: .5,
              width: "100%",
              backgroundColor: "#000",

            }}
          />
        );
      }
    static navigationOptions = ({ navigation }) => {
        return{
          headerTitle: "Manual",
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
    render () {
        const rows = this.ds.cloneWithRows(this.state.dataResp || [])

        return (
            <View style={{padding: 5}}>
            <Loader
            loading={this.state.loading} />
            <ListView
                dataSource = {rows}
                renderSeparator= {this.ListViewItemSeparator}
                enableEmptySections
                renderRow={(rowData) =>

                <View style={{flex:1, flexDirection: 'column', marginBottom: 10}} >
                  <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5,}}>
                    <Image style={{width: 25, height: 25}} source={{uri: "http://10.0.2.2:3000/manual/"+rowData.image}}/>
                    <Text style={styles.textViewContainer} >{rowData.title}</Text>
                  </View>
                  <Text >{rowData.description}</Text>

                </View>

                }
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({

    MainContainer :{

    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex:1,
    backgroundColor: '#fafafa',
    padding: 5,
    },

    textViewContainer: {
     textAlignVertical:'center',
    // padding:10,
     marginLeft: 5,
     fontSize: 20,
     color: '#000',

    }

    });