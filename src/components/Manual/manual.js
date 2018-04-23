
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
        //dataSource: [],
      };
    }
    componentWillReceiveProps(){
        var re='[{"image": "navigation.png","title": "Navigation System","description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},{"image": "guidance.png","title": "Guidance System","description": "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non-numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?"},{"image": "drive.png","title": "Drive System","description": "At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non-provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non-recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat…"},{"image": "defense.png","title": "Defense System","description": "Decore consequuntur ea pro, eos ignota apeirian eu. Sed an copiosae menandri, et utamur euismod quaerendum pri, explicari persequeris his in. Ad est doming causae nusquam, vidit nemore volutpat sed ea. Usu dolore persecuti assueverit ad, vim dolorum vivendum imperdiet an."}]';
        this.getManualResp();
    }
    getManualResp = () =>{
        var promise = new Promise((resolve, reject) => { 

         fetch('http://10.0.2.2:3000/manual/index.json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //'authorization': 'access_token',
        },
        }).then(response => response.json()).
        then((responseJSON) => {  
            console.log(responseJSON);
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            console.log(ds);
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJSON || []),
            });
            console.log(this.state.dataSource);
        })
        .catch((error) => {
            
            alert("Server Error !"+error);
        }); 
        return promise;
        }
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
            <Loader
            loading={this.state.loading} />
            <ListView
                dataSource={this.state.dataSource}
                renderSeparator= {this.ListViewItemSeparator}
                renderRow={(rowData) =>

                <View style={{flex:1, flexDirection: 'column'}} >
                <Text style={styles.textViewContainer} >{rowData.title}</Text>
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
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#00BCD4',
    padding: 5,
    
    },
    
    textViewContainer: {
    
     textAlignVertical:'center', 
     padding:10,
     fontSize: 20,
     color: '#fff',
    
    }
    
    });