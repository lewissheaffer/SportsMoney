import * as React from 'react';
import { Text, ListItem} from 'react-native-elements';
import {View, Button, ScrollView, RefreshControl} from 'react-native';
import {useState} from 'react';

export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      refreshing: false,
    }
  }

  componentDidMount() {
    this.fetchGroups("lewiss")
  }

  fetchGroups(username) {
    try{
      console.log("fetching groups");
      let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_groups', {
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
        this.setState({list:json});
        this.setState({refreshing:false});
      });
    }catch(err){
      console.log(err);
    }
  }

  refreshList() {
    this.setState({refreshing: true});
    this.fetchGroups("lewiss");
  }

  render() {
    return (
      <ScrollView refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>}>
        {
          this.state.list.map((l, i) => (
            <ListItem key={i} title={l.name} subtitle={l.sport} bottomDivider/>
          ))
        }
      </ScrollView>
    );
  }
}

export function createGroup(username, name, sport) {
    try{
      console.log("fetching groups");
      let response = fetch('https://sportsmoneynodejs.appspot.com/create_group', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            name: name,
            sport: sport,
          }),
      })
    }catch(err){
      console.log(err);
    }
}
