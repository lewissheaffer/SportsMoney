import React, { Component } from 'react';
import {Text,
    TextInput,
    View,
    Button ,
  StyleSheet,
StatusBar,
TouchableOpacity,
AppRegistry,
  Alert} from 'react-native';

export default class CreateUser extends Component{
  constructor(props) {
    super(props);
    this.state = {
      TextUsername: '',
      TextPassword: '',
      TextPassword1:'',
    };
  }
  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.TextUsername != '') {

      if (this.state.TextPassword ==this.state.TextPassword1) {

        alert('Success')
      } else {
        alert('Passwords are not equal');
      }
    } else {
      alert('Username cannot be blank');
    }
  };
render(){
return(
<View style={styles.View}>
<StatusBar backgroundColor='dodgerblue'/>
<Text style={styles.Logo}>
Create New Account
</Text>
<TextInput style={styles.TextInput} placeholder='Username (Max 20 characters)' onChangeText={TextUsername => this.setState({ TextUsername })}/>
<TextInput style={styles.TextInput} placeholder='Password' onChangeText={TextPassword => this.setState({ TextPassword })} secureTextEntry={true}/>
<TextInput style={styles.TextInput} placeholder='Enter Password again'onChangeText={TextPassword1 => this.setState({ TextPassword1 })} secureTextEntry={true}/>
<TouchableOpacity style={styles.Button} onPress={this.CheckTextInput}>
          <Text style={styles.LoginButtonText}>Create Account</Text>
        </TouchableOpacity>
</View>
);
}
}
  const styles = StyleSheet.create({
    Logo: {
    color: 'white',
    fontSize: 48,
    paddingBottom: 55,
    textAlign: 'center'
  },
       View:{
        justifyContent: 'center',
        backgroundColor: 'dodgerblue',
        flex: 1
      },
      TextInput: {
        backgroundColor:'white',
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom:10
      },
      Button: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom:10
      },
      LoginButtonText: {
   color: 'dodgerblue',
   fontSize: 18
 }
  });
