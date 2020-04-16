import * as React from 'react';
import { Text, ListItem} from 'react-native-elements';
import {View, Button, ScrollView, RefreshControl, Alert, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';

export default class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      refreshing: false,
    }
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages() {
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_messages', {
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
          this.setState({list:json});
          this.setState({refreshing:false});
        });
      }catch(err){
        console.log(err);
      }
    });
  }

  refreshList() {
    this.setState({refreshing: true});
    this.fetchMessages();
  }

  sendResponse(senderUsername, accepted) {
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/handle_friend_request', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: ukey,
              accepted: accepted,
              type: 'friend',
              senderUsername: senderUsername
            }),
        })
        .then((response) => response.json())
        .then((json) => {
          this.refreshList();

        });
      }catch(err){
        console.log(err);
      }
    });
  }

  render() {
    return (
      <ScrollView refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>}>
        {
          this.state.list.map((l, i) => (
          //onPress={() => {this.sendResponse(l.username, true)}}
            <ListItem key={i}  subtitle={
               l.type=='friend' && <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style = {{fontSize: 17,}}>{'Friend Request From: ' + l.username}</Text>
                 <View style = {{flexDirection:'row', alignSelf: "flex-end"}}>
                   <TouchableOpacity onPress = {() => {this.sendResponse(l.username, true)}}>
                      <Ionicons name={'md-checkmark-circle'} color = 'green' size={35} style={{marginRight:20, }}/>
                   </TouchableOpacity>
                   <TouchableOpacity onPress = {() => {this.sendResponse(l.username, false)}}>
                      <Ionicons name={'md-close-circle'} Title="Deny" color = 'red' size={35} style={{marginRight:10, }} />
                   </TouchableOpacity>
                </View>
              </View>
            }
            bottomDivider
            />
          ))
        }
      </ScrollView>
    );
  }
}

export function sendMessage(username, subject, message) {
  SecureStore.getItemAsync('key').then((ukey) => {
    try{
      let response = fetch('https://sportsmoneynodejs.appspot.com/send_message', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ukey: ukey,
            username: username,
            subject: subject,
            message: message
          }),
      })
      .then((response) => response.json())
      .then((json) => {

      });
    }catch(err){
      console.log(err);
    }
  });
}
