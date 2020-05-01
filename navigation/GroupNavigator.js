import React, {Component, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {View, StyleSheet, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Groups from '../screens/Groups';
import IndividualGroupNavigator from './IndividualGroupNavigator';
import {getStyles} from '../styling/Styles';
import {connect} from 'react-redux';

const Stack = createStackNavigator();
class GroupNavigator extends Component{
  constructor(props){
    super(props);
    this.state = {
      inviteModalVisible:false,
    }
  }

  render(){
      return(
        <React.Fragment>
          <View style={{flex:1, backgroundColor:'white'}}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <Stack.Navigator
                initialRouteName = 'Groups'
              >
                <Stack.Screen name="IndividualGroup" options = {{headerTitleAlign: 'center', headerStyle: this.props.styles.styles.Header, headerTitleStyle: this.props.styles.styles.HeaderTitle, headerTintColor: 'dodgerblue'}} component={IndividualGroupNavigator}/>
                <Stack.Screen name="Groups" options = {{headerTitleAlign: 'center', headerStyle: this.props.styles.styles.Header, headerTitleStyle: this.props.styles.styles.HeaderTitle,}} component={Groups}/>
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

export default connect(mapStateToProps)(GroupNavigator);
