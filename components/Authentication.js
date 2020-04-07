import React, {Component, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {View, StyleSheet} from 'react-native';

import Login from '../screens/Login';
import CreateUser from '../screens/CreateUser';
import Secured from '../screens/Secured';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Groups from '../screens/Groups';
import Profile from '../screens/Profile';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const Stack = createStackNavigator();

export default class Authentication extends Component{

  constructor(props){
    super(props);
    this.state = {
      page: this.authenticate(),
    }
  }

  authenticate = () => {
    SecureStore.getItemAsync('key').then((response) => {
      if(response !== null) {
        return("BottomTabNavigator");
      }
      return("BottomTabNavigator");
    });
  }

  render(){
      return(
        <View style={{flex:1, backgroundColor:'white'}}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer >
            <Stack.Navigator initialRouteName = {this.state.page}>
              <Stack.Screen name="Login" options = {{headerShown:false, headerTitleAlign: 'center', headerTitleStyle: {fontSize:22}, }} component={Login}/>
              <Stack.Screen name="CreateUser" options = {{headerShown:false, headerTitleAlign: 'center', headerTitleStyle: {fontSize:22}, }} component={CreateUser}/>
              <Stack.Screen name="BottomTabNavigator" options = {{headerTitleAlign: 'center', headerTitleStyle: {fontSize:22}, }} component={BottomTabNavigator}/>
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      );
    }
}
