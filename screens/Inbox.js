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

  sendResponse(type, senderUsername, group_id, accepted) {
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/handle_invite_request', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: ukey,
              accepted: accepted,
              type: type,
              senderUsername: senderUsername,
              group_id: group_id,
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

  sendMessageResponse(type, senderUsername, group_id) {
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/handle_message_response', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: ukey,
              type: type,
              senderUsername: senderUsername,
              group_id: group_id,
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
          //
            <ListItem key={i}  subtitle={
              <React.Fragment>
               {
                 (l.type =='friend') && <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                   <Text style = {{fontSize: 17,}}>{'Friend Request from: ' + l.username}</Text>
                   <View style = {{flexDirection:'row', justifyContent:'flex-end'}}>
                     <TouchableOpacity onPress = {() => {this.sendResponse(l.type, l.username, l.group_id, true)}}>
                        <Ionicons name={'md-checkmark-circle'} color = 'green' size={35} style={{marginRight:20, }}/>
                     </TouchableOpacity>
                     <TouchableOpacity onPress = {() => {this.sendResponse(l.type, l.username, l.group_id, false)}}>
                        <Ionicons name={'md-close-circle'} Title="Deny" color = 'red' size={35} style={{marginRight:10, }} />
                     </TouchableOpacity>
                    </View>
                  </View>
               }
               {
                   (l.type =='group') && <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                     <Text style = {{fontSize: 17,}}>{'Group Invite from: ' + l.username}</Text>
                    <View style = {{flexDirection:'row', justifyContent:'flex-end'}}>
                       <TouchableOpacity onPress = {() => {this.sendResponse(l.type, l.username, l.group_id, true)}}>
                          <Ionicons name={'md-checkmark-circle'} color = 'green' size={35} style={{marginRight:20, }}/>
                       </TouchableOpacity>
                       <TouchableOpacity onPress = {() => {this.sendResponse(l.type, l.username, l.group_id, false)}}>
                          <Ionicons name={'md-close-circle'} Title="Deny" color = 'red' size={35} style={{marginRight:10, }} />
                       </TouchableOpacity>
                    </View>
                  </View>
               }
               {
                 (l.type == 'message') && <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                   <TouchableOpacity onPress = {() => {this.sendResponse(l.type, l.username, l.group_id)}}>
                      <Ionicons name={'md-close-circle'} Title="Delete" color = 'red' size={35} style={{marginRight:10, }} />
                   </TouchableOpacity>   
                </View>
               }
               </React.Fragment>
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
