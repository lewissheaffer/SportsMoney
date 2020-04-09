import * as React from 'react';
import { Text, ListItem} from 'react-native-elements';
import {View, Button, ScrollView, RefreshControl, Alert} from 'react-native';
import {useState} from 'react';
import * as SecureStore from 'expo-secure-store';

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

  render() {
    return (
      <ScrollView refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>}>
        {
          this.state.list.map((l, i) => (
            <ListItem key={i} title={l.first_name + ' ' + l.last_name + ': ' + l.subject} onPress = {() => {this.props.navigation.navigate("Message")}}  subtitle={l.username} bottomDivider/>
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
