import * as React from 'react';
import { useState} from 'react';
import {View, Picker, TextInput, Platform, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Overlay, Text, Button, Input } from 'react-native-elements';
import {connect} from 'react-redux';

class GroupUserDialogModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      exists: false,
    }
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
        this.setState({exists: json.exists});
      });
    }catch(err){
      console.log(err);
    }
  }

  render(){
    return (
      <Overlay overlayStyle={this.props.styles.styles.Overlay} isVisible={this.props.isVisible} height = {200}  onBackdropPress = {() => {this.props.onClose()}}>
        <View style={{flex:1,}}>
          <Text style = {[{marginTop: 5, marginBottom: 10, fontWeight:'bold', fontSize: 20}, this.props.styles.styles.Text]}>Invite a User</Text>
          <Input inputStyle={this.props.styles.styles.Input} onChangeText = {(text) => {this.setState({username:text}); this.checkUser(text)}} placeholder = "Username" underlineColorAndroid='transparent' errorStyle={{color: 'red'}} errorMessage={this.state.exists ? '' : 'User does not exist.'} />
          <View style = {{flexDirection:'row-reverse', alignSelf: "flex-end"}}>
            <View style={{width: 80}}>
              <Button title = {"Submit"} type = {'clear'} disabled={!this.state.exists} onPress = {() => {
                this.props.onSubmit(this.state.username); this.setState({exists: false});
              }}/>
            </View>
            <View style={{width: 80}}>
              <Button title = {"Cancel"} type = {'clear'} onPress = {() => this.props.onClose()}/>
            </View>
          </View>
        </View>
      </Overlay>
    );
  }
}

const mapStateToProps = (state) => {
  const {styles} = state;
  return {styles};
}

export default connect(mapStateToProps)(GroupUserDialogModal);
