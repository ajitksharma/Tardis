import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    ListView,
  } from 'react-native';
import SQLite from 'react-native-sqlite-2';
export default class DatabasePage extends Component<Props> {
    constructor(props) {
      super(props);
      this.state = {
         resultSet: [],
      };
      this.ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }
    componentDidMount() {
      this.methodCall();
       }
    methodCall = () =>
    {
        const db = SQLite.openDatabase('demoDatabase.db', '1.0', '', 1);
        //  const db=SQLite.openDatabase({name : "demoDatabase.db", createFromLocation : 1}, okCallback,errorCallback);
        var _this=this;

          var resultSetLocal=[];
             return db.transaction(function (txn) {
                txn.executeSql('DROP TABLE IF EXISTS demoDatabase', []);
                txn.executeSql('CREATE TABLE IF NOT EXISTS demoDatabase(name TEXT)', []);
                txn.executeSql('INSERT INTO demoDatabase (name) VALUES (:name)', ['Niklaus Hunt']);
                txn.executeSql('INSERT INTO demoDatabase (name) VALUES (:name)', ['Rajeev Singh']);
                txn.executeSql('INSERT INTO demoDatabase (name) VALUES (:name)', ['Ian Nunley']);

                txn.executeSql('SELECT * FROM demoDatabase', [], function (tx, res) {
                   for (let i = 0; i < res.rows.length; ++i) {
                    _this.setState({
                      resultSet: res.rows,
                     });
                  }

                 return resultSetLocal;
                });

             });

           // return resultSetLocal;
    }
    static navigationOptions = ({ navigation }) => {
        return{
          headerTitle: "Database Page",
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
    render () {
        const rows = this.ds.cloneWithRows(this.state.resultSet["_array"] || []);
        return (
          <View style={{padding: 5}}>
            <ListView style ={{padding: 50}}
                dataSource = {rows}
                renderSeparator= {this.ListViewItemSeparator}
                enableEmptySections
                renderRow={(rowData) =>
                    <Text style={ styles.textViewContainer}> {rowData["name"]}</Text>
                }
                />
          </View>
        )
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
   fontSize: 20,
   color: '#000',

  }

  });