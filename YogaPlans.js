import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Image} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';

const db = SQLite.openDatabase('yogaPlans.db');

export default function YogaPlans() {

  const [yoga, setYoga] = useState("");
  const [time, setTime] = useState("");
  const[yogaPlans, setYogaPlans] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists yogaPlans (id integer primary key not null, yoga text, time text);');
    });
    updateList();    
  }, []);

  
  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into yogaPlans (yoga, time) values (?, ?);', [yoga, time]);    
      }, null, updateList
    )
  }

  
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from yogaPlans;', [], (_, { rows }) =>
        setYogaPlans(rows._array)
      ); 
    });
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from yogaPlans where id = ?;`, [id]);
      }, null, updateList
    )    
  }



    return (
      <View style={styles.container}>
       <Image
        style={{width: ScreenWidth, height: ScreenHeight, position: 'absolute'}}
        source={require('./tahti_taivas.jpg')} 
        />
        <TextInput placeholder='Yoga' style={styles.input}
          onChangeText={(text) => setYoga(text)}
          value={yoga}/>  
        <TextInput placeholder='Date & Time' style={styles.input}
          onChangeText={(text) => setTime(text)}
          value={time}/>      
        <Button onPress={saveItem} title="Add" /> 
        <Text style={{marginTop: "15%", marginBottom: "7%", fontSize: 20, color: '#fffafa'}}>Yoga plans for this week:</Text>
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.id.toString()} 
          renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 18, color: '#fffafa'}} >{item.time}: {item.yoga} </Text>
          <MaterialCommunityIcons name="delete" size={24} style={{color: '#fffafa'}} onPress={() => deleteItem(item.id)}/>
          </View>} 
          data={yogaPlans} 
    
        />      
      </View>
    );
  }
  
  const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%'
   },
   input: {
    backgroundColor: '#fffafa', 
    margin: '2%', 
    fontSize: 18, 
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1
  },
   
   listcontainer: {
    flexDirection: 'row',
    alignItems: 'center'
   },
  });