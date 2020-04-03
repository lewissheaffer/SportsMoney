import React, {Component, useState} from 'react';
import * as SecureStore from 'expo-secure-store';

import Login from '../screens/Login';
import CreateUser from '../screens/CreateUser';

export default class AuthenticationSequence extends Component{

  constructor(props){
    super(props);
    this.state = {
      page: 'Login'
    };
  }

  page = (pageName) => {
    this.setState({page: pageName});
  }

  render(){
    if(this.state.page == 'Login'){
      return <Login page={this.page}/>;
    }else{
      return <CreateUser page={this.page}/>;
    }
  }

}
