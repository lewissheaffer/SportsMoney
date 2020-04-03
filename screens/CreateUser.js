import React, { Component } from 'react';
import {Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  AppRegistry,
  Alert,
  ActivityIndicator} from 'react-native';

export default class CreateUser extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordCopy: '',
      isCreatingUser: false
    };
    this.props.page('CreateUser');
  }

  createAccount = () => {
    this.setState({isCreatingUser: true});
    fetch('https://sportsmoneynodejs.appspot.com/create_account', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    })
    .then((response) => response.json())
    .then((json) => {
      if(json.success){
        alert('Account created.');
        this.props.page('Login');
      }else if(json.error){
        alert('Error creating account.');
      }else{
        alert('An unknown error has occurred.');
      }
      this.setState({isCreatingUser: false});
    });
  }

  render(){
    return(
      <View style={styles.View}>
        <StatusBar backgroundColor='dodgerblue'/>
        <Text style={styles.Logo}>
          SportsMoney
        </Text>
        <Text style={styles.Subtitle}>
          Create Account
        </Text>
        <TextInput style={styles.TextInput} placeholder='Username (max 20 characters)' onChangeText={username => this.setState({ username })}/>
        <TextInput style={styles.TextInput} placeholder='Password' onChangeText={password => this.setState({ password })} secureTextEntry={true}/>
        <TextInput style={styles.TextInput} placeholder='Enter password again'onChangeText={passwordCopy => this.setState({ passwordCopy })} secureTextEntry={true}/>
        <TouchableOpacity style={styles.CreateUserButton} disabled={!this.state.username || !this.state.password || !this.state.password || this.state.password != this.state.passwordCopy || this.state.username.length > 20} onPress={this.createAccount}>
          <Text style={styles.CreateUserButtonText}>Create Account</Text>
          {this.state.isCreatingUser && <ActivityIndicator color='dodgerblue'/>}
        </TouchableOpacity>
        <Text style={styles.BackToLogin} onPress={() => this.props.page('Login')}>
          Back to Login
        </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  View: {
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    flex: 1
  },

  Logo: {
    color: 'white',
    fontSize: 48,
    paddingBottom: 55,
    textAlign: 'center'
  },

  Subtitle: {
    color: 'white',
    fontSize: 24,
    paddingBottom: 10,
    textAlign: 'center'
  },

  TextInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },

  CreateUserButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },

  CreateUserButtonText: {
    color: 'dodgerblue',
    fontSize: 18,
    paddingRight: 5
  },

  BackToLogin: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  }

});
