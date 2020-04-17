import React, {Component, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {View, StyleSheet, Text} from 'react-native';
import GroupDialogModal from '../components/GroupDialogModal';
import { createStackNavigator } from '@react-navigation/stack';
import Groups from '../screens/Groups';
import IndividualGroupNavigator from './IndividualGroupNavigator';
import { Ionicons } from '@expo/vector-icons';
import {createGroup} from '../screens/Groups'
import GroupUserDialogModal from "../components/GroupUserDialogModal";

const Stack = createStackNavigator();
export default class GroupNavigator extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal:false,
      inviteModalVisible:false,
    }
  }

  render(){
      return(
        <React.Fragment>
          <GroupDialogModal isVisible = {this.state.modal} onClose = {() => {this.setState({modal:false})}} onSubmit = {(groupName,league) => {this.setState({modal:false}); createGroup(groupName,league)}}/>
          <GroupUserDialogModal isVisible = {this.state.inviteModalVisible} onClose = {() => {this.setState({inviteModalVisible:false})}}/>  
          <View style={{flex:1, backgroundColor:'white'}}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <Stack.Navigator initialRouteName = 'Groups'>
                <Stack.Screen name="IndividualGroup" options = {{headerTitleAlign: 'center', headerTitleStyle: {fontSize:22}, headerRight: () => (
                  <Text style={{marginRight:20, }} onPress = {() => {this.setState({inviteModalVisible:true})}}>Invite User</Text>)}} component={IndividualGroupNavigator}/>
                <Stack.Screen name="Groups" options = {{headerTitleAlign: 'center', headerTitleStyle: {fontSize:22}, headerRight: () => (
                  <Ionicons name={'md-add-circle-outline'} size={35} style={{marginRight:20, }} onPress = {() => {this.setState({modal:true})}}/>)}} component={Groups}/>
              </Stack.Navigator>
          </View>
        </React.Fragment>
      );
    }
}
