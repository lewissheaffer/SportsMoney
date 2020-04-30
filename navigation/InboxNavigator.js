import React, {Component, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inbox from '../screens/Inbox';
import Message from '../screens/Message';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {getStyles} from '../styling/Styles';

const Stack = createStackNavigator();
export default class InboxNavigator extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal:false,
      styles: {}
    }
  }

  async componentDidMount() {
    let styles = await (async () => getStyles())();
    this.setState({styles: styles});
  }

  render(){
      return(
        <React.Fragment>
          <View style={{flex:1, backgroundColor:'white'}}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <Stack.Navigator initialRouteName = 'Inbox'>
                <Stack.Screen name="Message" options = {{headerTitleAlign: 'center', headerStyle: this.state.styles.Header, headerTitleStyle: this.state.styles.HeaderTitle, }} component={Message}/>
                <Stack.Screen name="Inbox" options = {{headerTitleAlign: 'center', headerStyle: this.state.styles.Header, headerTitleStyle: this.state.styles.HeaderTitle, }} component={Inbox}/>
              </Stack.Navigator>
          </View>
        </React.Fragment>
      );
    }
}
