import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Alert, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';


export default function YogaPositions() {
  const [keyword, setKeyword] = useState('');
const [repositories, setRepositories] = useState([]);

const getRepositories = () => {
  const url = `https://lightning-yoga-api.herokuapp.com/yoga_poses?english_name=${keyword}`
  fetch(url)
  .then(response => response.json())
  .then(data => {
    setRepositories(data.items)})
  .catch(error => {
    Alert.alert('Error', error);
  });

}

const listSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "80%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%"
      }}
    />
  );
};  
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={{fontSize: 26}}>Yoga Positions</Text>
      <FlatList
        style={{marginLeft : "5%", marginTop: "10%"}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return(
          <View>
            <Text
              style={{fontSize: 18, fontWeight: "bold"}}>
              Name in english: {item.english_name}
              </Text>
            <Text
              style={{fontSize: 18, fontWeight: "bold"}}>
              Name in english: {item.sanskrit_name}     
              </Text>   
          
               
          </View>
          );
            }}
      data={repositories} 
      ItemSeparatorComponent={listSeparator} />
      
      <Text style={{marginBottom: "10%", textAlign: 'center'}}>
      Take a look at the different yoga positions and their names in english ans sanskrit</Text>
      <TextInput
      style={{fontSize:18, width:100}}
      placeholder='keyword'
      onChangeText={text => setKeyword(text)}
      />
      <Button title="Find" onPress={getRepositories}/>
      
      
    </View>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });  