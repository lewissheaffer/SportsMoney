import React, {Component, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inbox from '../screens/Inbox';
import Message from '../screens/Message';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {connect} from 'react-redux';

const Stack = createStackNavigator();
class InboxNavigator extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal:false,
    }
  }

  render(){
      return(
        <React.Fragment>
          <View style={{flex:1, backgroundColor:'white'}}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <Stack.Navigator initialRouteName = 'Inbox'>
                <Stack.Screen name="Message" options = {{headerTitleAlign: 'center', headerStyle: this.props.styles.styles.Header, headerTitleStyle: this.props.styles.styles.HeaderTitle, }} component={Message}/>
                <Stack.Screen name="Inbox" options = {{headerTitleAlign: 'center', headerStyle: this.props.styles.styles.Header, headerTitleStyle: this.props.styles.styles.HeaderTitle, }} component={Inbox}/>
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

export default connect(mapStateToProps)(InboxNavigator);
