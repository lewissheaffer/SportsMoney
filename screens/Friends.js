import * as React from 'react';
import { Text, ListItem} from 'react-native-elements';
import {View, Button, ScrollView, RefreshControl, Alert} from 'react-native';
import {useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {connect} from 'react-redux';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      refreshing: false,
    }
  }

  async componentDidMount() {
    this.refreshList();
    this.props.navigation.addListener(
      'focus', () => {
        this.fetchFriends();
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
      <ScrollView style={this.props.styles.styles.ScrollView} refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>}>
        {

          this.state.list.map((l, i) => (
            <ListItem key={i}
              title={l.first_name + ' ' + l.last_name}
              containerStyle={this.props.styles.styles['ListItem.containerStyle']}
              titleStyle={this.props.styles.styles['ListItem.titleStyle']}
              subtitleStyle={this.props.styles.styles['ListItem.subtitleStyle']}
              onPress = {() => {this.props.navigation.navigate("IndividualFriend", {username:l.username, first_name:l.first_name,last_name:l.last_name, ukey:l.ukey})}}  subtitle={l.username} bottomDivider/>
          ))
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const {styles} = state;
  return {styles};
}

export default connect(mapStateToProps)(Friends);

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
