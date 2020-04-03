import React, {Component, useState} from 'react';
import * as SecureStore from 'expo-secure-store';


import Login from '../screens/Login';
import CreateUser from '../screens/CreateUser';
import Secured from '../screens/Secured';

export default class Authentication extends Component{

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      page: 'Login',
      submitClicked: false,
    }
  }

  page = (pageName) => {
    this.setState({page: pageName});
  }

  rerender = () => {
    this.setState({submitClicked:true});
    this.setState({submitClicked:false});
  }

  render(){
    SecureStore.getItemAsync('key').then((response) => {
      if(response !== null){
        this.setState({isLoggedIn: true});
      }
    });
    if(this.state.isLoggedIn == false){
      if(this.state.page == 'Login'){
        return <Login page={this.page} submitClicked={this.rerender}/>;
      }
      else{
        return <CreateUser page={this.page}/>;
      }
    }else{
      return <Secured/>;
    }
  }

}
