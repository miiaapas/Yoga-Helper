import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';


export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <Image
      style={{ width: ScreenWidth, height: ScreenHeight, position: 'absolute'}}
      source={require('./tahti_taivas.jpg')} 
      />
     <Text style={{fontSize: 22, color: '#fffafa'}}>YOGA HELPER</Text>
     
     <Text style={{fontSize: 16, color: '#fffafa', padding: "5%"}}>{'\n'}Here you can take a look of the best yoga poses.
     You can see how the position are done and also their name in english and sanskrit. </Text>
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