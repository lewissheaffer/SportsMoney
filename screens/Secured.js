import React, {Component} from 'react';
import { Platform, StatusBar, StyleSheet, View, Button, Modal} from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from '../navigation/BottomTabNavigator';
import useLinking from '../navigation/useLinking';

export default class Secured extends Component{

  render(){
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen name="test" options = {{headerTitleAlign: 'center', headerTitleStyle: {fontSize:22}, }} component={BottomTabNavigator}/>
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
