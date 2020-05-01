import * as React from 'react';
import {Text, ListItem} from 'react-native-elements';
import {View, Button, ScrollView, RefreshControl, StyleSheet} from 'react-native';
import {useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {connect} from 'react-redux';
import GroupDialogModal from '../components/GroupDialogModal';
import { Ionicons } from '@expo/vector-icons';

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      refreshing: false,
      g_id: '',
      styles: {},
      modal: false,
    }
  }

  async componentDidMount() {
    this.fetchGroups();
    this.props.navigation.setOptions({headerRight: () => (
    <Ionicons name={'md-add-circle-outline'} size={35} style={this.props.styles.styles.HeaderIcon} onPress = {() => {this.setState({modal:true})}}/>)});
  }

  createGroup(name, sport) {
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
    return (
      <React.Fragment>
        <GroupDialogModal isVisible = {this.state.modal} onClose = {() => {this.setState({modal:false})}} onSubmit = {(groupName,league) => {this.setState({modal:false}); this.createGroup(groupName,league); this.refreshList();}}/>
        <ScrollView style={this.props.styles.styles.ScrollView} refreshControl={<RefreshControl refreshing = {
          this.state.refreshing
        }
        onRefresh = {
          () => this.refreshList()
        } />}>
        {
          this.state.list.map((l, i) => (<ListItem containerStyle={this.props.styles.styles['ListItem.containerStyle']}
            titleStyle={this.props.styles.styles['ListItem.titleStyle']}
            subtitleStyle={this.props.styles.styles['ListItem.subtitleStyle']}
            key={i} title={l.name}
            onPress={() => {
              this.props.navigation.navigate("IndividualGroup", {
                groupName: l.name,
                groupSport: l.sport,
                group_id: l.group_id,
              })
            }} subtitle={l.sport} bottomDivider={true}/>))
        }
      </ScrollView>
    </React.Fragment>
  );
  }
}

const mapStateToProps = (state) => {
  const {styles} = state;
  return {styles};
}

export default connect(mapStateToProps)(Groups);
