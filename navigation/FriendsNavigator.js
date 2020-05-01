import React, {Component, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {View, StyleSheet} from 'react-native';
import FriendDialogModal from '../components/FriendDialogModal';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Friends from '../screens/Friends';
import IndividualFriend from '../screens/IndividualFriend';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux';

const Stack = createStackNavigator();
class FriendsNavigator extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal:false,
    }
  }

  render(){
      return(
        <React.Fragment>
          <FriendDialogModal isVisible = {this.state.modal} onClose = {() => {this.setState({modal:false})}} onSubmit = {(username) => {this.setState({modal:false}); addFriend(username)}}/>
          <View style={{flex:1, backgroundColor:'white'}}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <Stack.Navigator initialRouteName = 'Friends'>
                <Stack.Screen name="IndividualFriend" options = {{headerTitleAlign: 'center', headerStyle: this.props.styles.styles.Header, headerTitleStyle: this.props.styles.styles.HeaderTitle, headerTintColor: 'dodgerblue' }} component={IndividualFriend}/>
                <Stack.Screen name="Friends" options = {{headerTitleAlign: 'center', headerStyle: this.props.styles.styles.Header, headerTitleStyle: this.props.styles.styles.HeaderTitle, headerRight: () => (
                  <Ionicons name={'md-person-add'} size={35} style={this.props.styles.styles.HeaderIcon} onPress = {() => {this.setState({modal:true})}}/>)}} component={Friends}/>
              </Stack.Navigator>
          </View>
        </React.Fragment>
      );
    }
}

const mapStateToProps = (state) => {
  const {styles} = state;
  return {styles};
}

export default connect(mapStateToProps)(FriendsNavigator);
