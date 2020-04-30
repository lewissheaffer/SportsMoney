import * as React from 'react';
import {Text, ListItem} from 'react-native-elements';
import {View, Button, ScrollView, RefreshControl, StyleSheet} from 'react-native';
import {useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {getStyles} from '../styling/Styles';

export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      refreshing: false,
      g_id: '',
      styles: {}
    }
  }

  async componentDidMount() {
    this.fetchGroups();
    let styles = await (async () => getStyles())();
    this.setState({styles: styles});
  }

  fetchGroups() {
    SecureStore.getItemAsync('key').then((ukey) => {
      try {
        let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_groups', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ukey: ukey})
        }).then((response) => response.json()).then((json) => {
          this.setState({list: json});
          this.setState({refreshing: false});
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  refreshList() {
    this.setState({refreshing: true});
    this.fetchGroups();
  }

  render() {
    return (<ScrollView style={this.state.styles.ScrollView} refreshControl={<RefreshControl refreshing = {
        this.state.refreshing
      }
      onRefresh = {
        () => this.refreshList()
      } />}>
      {
        this.state.list.map((l, i) => (<ListItem containerStyle={this.state.styles['ListItem.containerStyle']}
          titleStyle={this.state.styles['ListItem.titleStyle']}
          subtitleStyle={this.state.styles['ListItem.subtitleStyle']}
          key={i} title={l.name}
          onPress={() => {
            this.props.navigation.navigate("IndividualGroup", {
              groupName: l.name,
              groupSport: l.sport,
              group_id: l.group_id,
            })
          }} subtitle={l.sport} bottomDivider={true}/>))
      }
    </ScrollView>);
  }
}

export function createGroup(name, sport) {
  SecureStore.getItemAsync('key').then((ukey) => {
    try {
      let response = fetch('https://sportsmoneynodejs.appspot.com/create_group', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ukey: ukey, name: name, sport: sport})
      })
    } catch (err) {
      console.log(err);
    }
  });
}

export function addGroup(g_id, name, sport) {
  SecureStore.getItemAsync('key').then((ukey) => {
    try {
      let response = fetch('https://sportsmoneynodejs.appspot.com/add_group', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ukey: ukey, group_id: g_id, name: name, sport: sport})
      })

    } catch (err) {
      console.log(err);
    }
  });
}
