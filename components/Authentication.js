import React, {Component, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {View, StyleSheet, Platform} from 'react-native';

import Login from '../screens/Login';
import CreateUser from '../screens/CreateUser';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Groups from '../screens/Groups';
import Profile from '../screens/Profile';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import {getStyles} from '../styling/Styles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeStyles} from '../redux/Action';

const Stack = createStackNavigator();

class Authentication extends Component{

  constructor(props){
    super(props);
    this.state = {
    }
  }

  async UNSAFE_componentWillMount() {
    let styles = await (async () => getStyles())();
    this.props.changeStyles(styles);
  }

  render(){
      return(
        <View style={{flex:1, backgroundColor:'white'}}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer >
            <Stack.Navigator initialRouteName = 'Login'>
              <Stack.Screen name="Login" options = {{headerShown:false, headerTitleAlign: 'center', headerTitleStyle: {fontSize:22}, }} component={Login}/>
              <Stack.Screen name="CreateUser" options = {{headerShown:false, headerTitleAlign: 'center', headerTitleStyle: {fontSize:22}, }} component={CreateUser}/>
              <Stack.Screen name="BottomTabNavigator" options = {{headerTitleAlign: 'center', headerStyle: this.props.styles.styles.Header, headerTitleStyle: this.props.styles.styles.HeaderTitle, }} component={BottomTabNavigator}/>
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      );
    }
}

const mapStateToProps = (state) => {
  const {styles} = state;
  return {styles};
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    changeStyles
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
