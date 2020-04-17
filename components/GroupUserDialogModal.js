import * as React from 'react';
import { useState} from 'react';
import {View, Picker, TextInput, Platform, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Overlay, Text, Button, Input } from 'react-native-elements';
import {GroupMemberInvite} from '../navigation/IndividualGroupNavigator'

export default class GroupUserDialogModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      exists: false
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
      <Overlay isVisible={this.props.isVisible} height = {200}  onBackdropPress = {() => {this.props.onClose()}}>
        <View style={{flex:1,}}>
          <Text style = {{marginTop: 5, marginBottom: 10, fontWeight:'bold', fontSize: 20}}>Invite a User</Text>
          <Input style = {styles.input_container} onChangeText = {(text) => {this.setState({username:text}); this.checkUser(text)}} placeholder = "Username" underlineColorAndroid='transparent' errorStyle={{color: 'red'}} errorMessage={this.state.exists ? '' : 'User does not exist.'} />
          <View style = {{flexDirection:'row-reverse', alignSelf: "flex-end"}}>
            <View style={{width: 80}}>
              <Button title = {"Submit"} type = {'clear'} disabled={!this.state.exists} onPress = {() => {
                GroupMemberInvite({this.props.group_id}); this.props.onClose(); this.setState({exists: false});
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

const styles = StyleSheet.create({
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
});
