import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
  } from 'react-native';
import SQLite from 'react-native-sqlite-2';
export default class DatabasePage extends Component<Props> {
    constructor(props) {
      super(props);
      this.state = {
         resultSet: [],
      };
      this.resultSet =[];
    }
    componentDidMount() {
      console.log(this.methodCall());
       }   
    methodCall = () =>
    {
        const db = SQLite.openDatabase('demoDatabase.db', '1.0', '', 1);
        //  const db=SQLite.openDatabase({name : "demoDatabase.db", createFromLocation : 1}, okCallback,errorCallback);
           // var resultSet1=[];
             db.transaction(function (txn) {
                txn.executeSql('DROP TABLE IF EXISTS demoDatabase', []);
                txn.executeSql('CREATE TABLE IF NOT EXISTS demoDatabase(name TEXT)', []); 
               txn.executeSql('INSERT INTO demoDatabase (name) VALUES (:name)', ['ajit']);
                txn.executeSql('INSERT INTO demoDatabase (name) VALUES (:name)', ['ram']); 
                txn.executeSql('SELECT * FROM demoDatabase', [], function (tx, res) {
                   for (let i = 0; i < res.rows.length; ++i) {
                    console.log('item:'+ JSON.stringify(res.rows));
                  } 
                  console.log("result"+res.rows);
                 this.resultSet=res.rows;
    

                });
                
             });
             this.setState({
                resultSet: this.resultSet
             })
            return this.resultSet;
    }
    static navigationOptions = ({ navigation }) => {
        return{
          headerTitle: "Database Page",
          headerLeft: (
            <TouchableOpacity onPress={() =>     navigation.navigate('DrawerOpen')}>
                  <Image style={{marginLeft: 10, padding:5, width: 25, height: 25}}  source={require('../Util/img/nav.png')} />
            </TouchableOpacity>
          ),
        }
    }

    render () {
        console.log("this"+this.state.resultSet);
        const d='[{"name":"ajit"},{"name":"ram"}]';
        return (
            <View >

            <Text >This is Database page</Text>
            {d.name.map((Q, index) => (
        <Text key={index}>Hello, {Q.name}</Text>
    ))}
            </View>
        )
    }

}