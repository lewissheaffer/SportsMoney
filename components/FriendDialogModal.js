import * as React from 'react';
import { useState} from 'react';
import {View, Picker, TextInput, Platform, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Overlay, Text, Button, Input } from 'react-native-elements';
import {addFriend} from '../screens/Friends';
import {sendmessage} from '../screens/Inbox';
import * as SecureStore from 'expo-secure-store';
import {connect} from 'react-redux';

class FriendDialogModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      exists: false,
      FriendsUsername:'',
      Friendexists: false,
      Message:'',
      subject:'',
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
            username: friendsusername,
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

  fetchName() {
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_user_by_ukey', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: ukey
            }),
        })
        .then((response) => response.json())
        .then((json) => {
          this.setState({username:json.username});
        });
      }catch(err){
        console.log("name error: "+err);
      }
    });
  }

  render(){
    return (
      <Overlay overlayStyle={this.props.styles.styles.Overlay} isVisible={this.props.isVisible} height = {175}  onBackdropPress = {() => {this.props.onClose()}}>
        <View style={{flex:1,}}>
          <Text style = {[{marginTop: 5, marginBottom: 10, fontWeight:'bold', fontSize: 20}, this.props.styles.styles.Text]}>Add a Friend</Text>
          <Input inputStyle={this.props.styles.styles.Input} onChangeText = {(text) => {this.setState({username:text}); this.checkUser(text)}} placeholder = "Friend's username" underlineColorAndroid='transparent' errorStyle={{color: 'red'}} errorMessage={this.state.exists ? '' : 'User does not exist.'} />
          <View style = {{flexDirection:'row-reverse', alignSelf: "flex-end"}}>
            <View style={{width: 80}}>
              <Button title = {"Submit"} type = {'clear'} disabled={!this.state.exists || (this.state.username == this.state.FriendsUsername)} onPress = {() => {
                addFriend(this.state.FriendsUsername); this.props.onClose(); this.setState({exists: false});
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

export default connect(mapStateToProps)(FriendDialogModal);

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
