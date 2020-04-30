import React, {Component, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {View, StyleSheet, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Groups from '../screens/Groups';
import IndividualGroupNavigator from './IndividualGroupNavigator';
import {getStyles} from '../styling/Styles';

const Stack = createStackNavigator();
export default class GroupNavigator extends Component{
  constructor(props){
    super(props);
    this.state = {
      inviteModalVisible:false,
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
              <Stack.Navigator
                initialRouteName = 'Groups'
              >
                <Stack.Screen name="IndividualGroup" options = {{headerTitleAlign: 'center', headerStyle: this.state.styles.Header, headerTitleStyle: this.state.styles.HeaderTitle, headerTintColor: 'dodgerblue'}} component={IndividualGroupNavigator}/>
                <Stack.Screen name="Groups" options = {{headerTitleAlign: 'center', headerStyle: this.state.styles.Header, headerTitleStyle: this.state.styles.HeaderTitle,}} component={Groups}/>
              </Stack.Navigator>
          </View>
        </React.Fragment>
      );
    }
}
