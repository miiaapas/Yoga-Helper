import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Alert, Image} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';

export default function YogaPositions() {

const [keyword, setKeyword] = useState('');
const [repositories, setRepositories] = useState([]);

const getRepositories = (keyword) => {
  const url = `https://lightning-yoga-api.herokuapp.com/yoga_poses?english_name=${keyword}`
  fetch(url)
  .then(response => response.json())
  .then(data => {
    setRepositories(data.items)})
  .catch(error => {
    Alert.alert('Error', error);
  });

}



const getImage = (asana) => {
  if(asana === 'Bow'){
  return require('./Images/Bow.png')
  }else if (asana === 'Butterfly'){
    return require('./Images/Butterfly.png')
  }else if (asana === 'Camel'){
    return require('./Images/Camel.png')
  }else if (asana === 'Chair'){
    return require('./Images/Chair.png')
  }else if (asana === 'Crow'){
    return require('./Images/Crow.png')
  }else if (asana === 'Dolphin'){
    return require('./Images/Dolphin.png')
  }else if (asana === 'Lotus'){
    return require('./Images/Lotus.png')
  }else if (asana === 'Triangle'){
    return require('./Images/Triangle.png')
  }
}
const asanas = ["Bow", "Butterfly", "Camel", "Chair", "Crow", "Dolphin", 
"Lotus", "Triangle"];

const twofunctions = keyword => {
  setKeyword(keyword);
  getRepositories(keyword);
}
  


  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Image
      style={{ width: ScreenWidth, height: ScreenHeight, position: 'absolute'}}
      source={require('./tahti_taivas.jpg')} 
      />
      <FlatList
        style={{marginLeft : "7%", marginTop: "20%"}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return(
          <View>
            <Image
                style={{backgroundColor: "#fffafa", width:220, height:220 }}
                source={getImage(item.english_name)}
            />
            <Text
              style={{fontSize: 18, color: "#fffafa"}}>
               {'\n'}  
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
      onSelect={twofunctions} 
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
      paddingBottom: '30%'
    },
  
  });  