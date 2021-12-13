import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Alert, Image} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'


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




  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
  
      <FlatList
        style={{marginLeft : "5%", marginTop: "10%"}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return(
          <View>
           
            <Text
              style={{fontSize: 16}}>
              Name in english: {item.english_name}
              {'\n'}
              Name in sanskrit: {item.sanskrit_name}     
              </Text>   
              
               
          </View>
          );
            }}
      data={repositories} 
      />
      
     <SelectDropdown
      data={asanas}
      onSelect={(selectedItem) => setKeyword(selectedItem)}
     />
    
      <Button title="Select" onPress={getRepositories}/>
      
      
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