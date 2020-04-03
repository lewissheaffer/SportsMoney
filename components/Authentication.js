import React, {Component, useState} from 'react';
import * as SecureStore from 'expo-secure-store';

import AuthenticationSequence from './AuthenticationSequence';
import Secured from '../screens/Secured';

export default class Authentication extends Component{

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  render(){
    SecureStore.getItemAsync('key').then((response) => {
      if(response !== null){
        this.setState({isLoggedIn: true});
      }
    });
    if(this.state.isLoggedIn == false){
      return <AuthenticationSequence/>;
    }
    else{
      return <Secured/>;
    }
  }

}
