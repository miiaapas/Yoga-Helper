import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';  
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen'
import YogaPositions from './YogaPositions';
import YogaTypes from './YogaTypes';


const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = 'home';
    } else if (route.name === 'Yoga Positions') {
      iconName = 'yoga';
    } else if (route.name === 'Yoga Types') {
      iconName = 'yin-yang';
    }

    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
  }
});

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Yoga Positions" component={YogaPositions} />
        <Tab.Screen name="Yoga Types" component={YogaTypes} />
      </Tab.Navigator>
    </NavigationContainer>
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
