import React, {Component} from 'react';
import {View,
  TouchableOpacity,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Alert} from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoggingIn: false,
    };
    this.props.page('Login');
  }

  authenticate = () => {
    this.setState({isLoggingIn: true});
    fetch('https://sportsmoneynodejs.appspot.com/login', {
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
      if(json[0].ukey){
        SecureStore.setItemAsync('key', json[0].ukey);
      }else{
        alert('Incorrect username or password.');
      }
      this.setState({isLoggingIn: false});
    });
  }

  render(){
    return (
      <View style={styles.View}>
        <StatusBar backgroundColor='dodgerblue'/>
        <Text style={styles.Logo}>
          SportsMoney
        </Text>
        <Text style={styles.Subtitle}>
          Login
        </Text>
        <TextInput style={styles.TextInput} placeholder='Username' onChangeText={username => this.setState({username})}/>
        <TextInput style={styles.TextInput} placeholder='Password' secureTextEntry={true} onChangeText={password => this.setState({password})}/>
        <TouchableOpacity style={styles.LoginButton} disabled={this.state.isLoggingIn || !this.state.username || !this.state.password} onPress={this.authenticate}>
          <Text style={styles.LoginButtonText}>Login</Text>
          {this.state.isLoggingIn && <ActivityIndicator color='dodgerblue'/>}
        </TouchableOpacity>
        <Text style={styles.CreateAccount} onPress={() => this.props.page('CreateUser')}>
          Create Account
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

  LoginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },

  LoginButtonText: {
    color: 'dodgerblue',
    fontSize: 18,
    paddingRight: 5
  },

  CreateAccount: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  }

});
