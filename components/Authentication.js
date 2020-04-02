import React, {Component, useState} from 'react';
import * as SecureStore from 'expo-secure-store';

import Login from '../screens/Login';
import Secured from '../screens/Secured';

export default class Authentication extends Component{

  state = {
    isLoggedIn: false
  }

  render(){
    if(this.state.isLoggedIn == false){
      return <Login/>;
    }else{
      return <Secured/>;
    }
  }

}
