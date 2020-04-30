import * as React from 'react';
import { Text, ListItem} from 'react-native-elements';
import {View, Button, ScrollView, RefreshControl, Alert} from 'react-native';
import {useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {getStyles} from '../styling/Styles';

export default class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      refreshing: false,
      styles: {}
    }
  }

  async componentDidMount() {
    this.refreshList();
    let styles = await (async () => getStyles())();
    this.setState({styles: styles});
    this.props.navigation.addListener(
      'focus', () => {
        this.refreshList();
      }
    );
  }

  fetchFriends() {
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_friends', {
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
    this.fetchFriends();
  }

  render() {
    return (
      <ScrollView style={this.state.styles.ScrollView} refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>}>
        {

          this.state.list.map((l, i) => (
            <ListItem key={i}
              title={l.first_name + ' ' + l.last_name}
              containerStyle={this.state.styles['ListItem.containerStyle']}
              titleStyle={this.state.styles['ListItem.titleStyle']}
              subtitleStyle={this.state.styles['ListItem.subtitleStyle']}
              onPress = {() => {this.props.navigation.navigate("IndividualFriend", {username:l.username, first_name:l.first_name,last_name:l.last_name, ukey:l.ukey})}}  subtitle={l.username} bottomDivider/>
          ))
        }
      </ScrollView>
    );
  }
}

export function addFriend(username) {
  SecureStore.getItemAsync('key').then((ukey) => {
    try{
      let response = fetch('https://sportsmoneynodejs.appspot.com/add_friend', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ukey: ukey,
            username: username,
          }),
      })
      .then((response) => response.json())
      .then((json) => {
        if(json.already_friends){
          alert('You are already friends with this user.');
        }
      });
    }catch(err){
      console.log(err);
    }
  });
}
