import React, {Component, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {View, StyleSheet} from 'react-native';
import GroupDialogModal from '../components/GroupDialogModal';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Groups from '../screens/Groups';
import IndividualGroup from '../screens/IndividualGroup';
import { Ionicons } from '@expo/vector-icons';
import {createGroup} from '../screens/Groups'

const Stack = createStackNavigator();
export default class GroupNavigator extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal:false,
      selectedValue:'NBA',
    }
  }

  render(){
      return(
        <React.Fragment>
          <GroupDialogModal isVisible = {this.state.modal} onClose = {() => {this.setState({modal:false})}} onSubmit = {(groupName,league) => {this.setState({modal:false}); createGroup(groupName,league)}}/>
          <View style={{flex:1, backgroundColor:'white'}}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <Stack.Navigator initialRouteName = 'Groups'>
                <Stack.Screen name="IndividualGroup" options = {{headerTitleAlign: 'center', headerTitleStyle: {fontSize:22}, }} component={IndividualGroup}/>
                <Stack.Screen name="Groups" options = {{headerTitleAlign: 'center', headerTitleStyle: {fontSize:22}, headerRight: () => (
                  <Ionicons name={'md-add-circle-outline'} size={35} style={{marginRight:20, }} onPress = {() => {this.setState({modal:true})}}/>)}} component={Groups}/>
              </Stack.Navigator>
          </View>
        </React.Fragment>
      );
    }
}
