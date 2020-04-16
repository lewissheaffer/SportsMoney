import * as React from 'react';
import { Text, ListItem} from 'react-native-elements';
import {View, Button, ScrollView, RefreshControl} from 'react-native';
import {useState} from 'react';
import * as SecureStore from 'expo-secure-store';

export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      refreshing: false,
      g_id: '',
    }
  }

  componentDidMount() {
    this.fetchGroups();
  }

  fetchGroups() {
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_groups', {
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
    this.fetchGroups();
  }



  render() {
    return (
      <ScrollView refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>}>
        {
          this.state.list.map((l, i) => (
            <ListItem key={i} title={l.name} onPress = {() => {this.props.navigation.navigate("IndividualGroup", {groupName:l.name})}}  subtitle={l.sport} bottomDivider/>
          ))
        }
      </ScrollView>
    );
  }
}

export function createGroup(name, sport) {
  SecureStore.getItemAsync('key').then((ukey) => {
    try{
      let response = fetch('https://sportsmoneynodejs.appspot.com/create_group', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ukey: ukey,
            name: name,
            sport: sport,
          }),
      })
    }catch(err){
      console.log(err);
    }
  });
}

export function addGroup(g_id,name,sport) {
  SecureStore.getItemAsync('key').then((ukey) => {
    try{
      let response = fetch('https://sportsmoneynodejs.appspot.com/add_group', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ukey: ukey,
            group_id: g_id,
            name: name,
            sport: sport,
          }),
      })

    }catch(err){
      console.log(err);
    }
  });
}
