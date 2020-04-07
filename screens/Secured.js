import React, {Component, useState} from 'react';
import { Platform, StatusBar, StyleSheet, View, Button, Modal} from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Groups from '../screens/Groups';
import Profile from '../screens/Profile';

import BottomTabNavigator from '../navigation/BottomTabNavigator';


const Stack = createStackNavigator();

export default class Secured extends Component{

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Groups">
            <Stack.Screen name="Profile" options = {{headerTitleAlign: 'center', headerTitleStyle: {fontSize:22}, }} component={Profile}/>
            <Stack.Screen name="Groups" options = {{headerTitleAlign: 'center', headerTitleStyle: {fontSize:22}, }} component={Groups}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
