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
import {Input} from 'react-native-elements';

export default class CreateUser extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      password: '',
      passwordCopy: '',
      isCreatingUser: false,
      usernameExists:false,
    };
  }

  checkUser = (username) => {
    try{
      let response = fetch('https://sportsmoneynodejs.appspot.com/check_user', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
          }),
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({usernameExists: json.exists});
      });
    }catch(err){
      console.log(err);
    }
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
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password
      }),
    })
    .then((response) => response.json())
    .then((json) => {
      if(json.success){
        alert('Account created.');
        this.props.navigation.navigate('Login');
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
        <TextInput style = {styles.TextInput} onChangeText = {(text) => {this.setState({username:text}); this.checkUser(text)}} placeholder = "Friend's username" underlineColorAndroid='transparent' errorStyle={{color: 'red'}} errorMessage={this.state.exists ? '' : 'User does not exist.'} />
        {
          this.state.usernameExists && <Text style = {styles.ErrorText}>Username already exists</Text>
        }
        <TextInput style={styles.TextInput} placeholder='Username (max 20 characters)' onChangeText={username => this.setState({ username })}/>
        <TextInput style={styles.TextInput} placeholder='First Name (max 20 characters)' onChangeText={first_name => this.setState({ first_name })}/>
        <TextInput style={styles.TextInput} placeholder='Last Name (max 20 characters)' onChangeText={last_name => this.setState({ last_name })}/>
        <TextInput style={styles.TextInput} placeholder='Password' onChangeText={password => this.setState({ password })} secureTextEntry={true}/>
        <TextInput style={styles.TextInput} placeholder='Enter password again'onChangeText={passwordCopy => this.setState({ passwordCopy })} secureTextEntry={true}/>
        <TouchableOpacity style={styles.CreateUserButton} disabled={this.state.usernameExists || !this.state.username || !this.state.first_name || !this.state.last_name || !this.state.password || !this.state.password || this.state.password != this.state.passwordCopy || this.state.username.length > 20 || this.state.first_name.length > 20 || this.state.last_name.length > 20} onPress={this.createAccount}>
          <Text style={styles.CreateUserButtonText}>Create Account</Text>
          {this.state.isCreatingUser && <ActivityIndicator color='dodgerblue'/>}
        </TouchableOpacity>
        <Text style={styles.BackToLogin} onPress={() => this.props.navigation.navigate('Login')}>
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
  ErrorText: {
    color: 'red',
    alignSelf: 'center',
    borderRadius: 10,
    marginLeft: 12,
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

  input_container:{
    textAlign:'left',
    fontSize: 16,
    color: 'rgba(0,0,0,0.54)',
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingTop: 5,
        borderWidth: 1,
        borderColor: '#B0B0B0',
        paddingBottom: 5,
        paddingLeft: 10,
        marginBottom: 15,
        marginTop: 10,
      },
      android: {
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: 'dodgerblue',
      },
    }),
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
