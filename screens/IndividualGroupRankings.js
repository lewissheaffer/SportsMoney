import * as React from 'react';
import {View, Button, ScrollView, RefreshControl} from 'react-native';
import { Text } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default class GroupRankings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankingsList:[],
      refreshing: false,
    }
  }

  refreshList() {
    this.setState({refreshing: true});
    //Include call to fetch values to refresh
    //Turn off refreshing after the list has been set
    //Copy the line below into that method
    this.setState({refreshing:false});
  }

  render(){
    return (
      <ScrollView refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>}>
        {
          this.state.rankingsList.map((l, i) => (
            <ListItem key={i} title={l.name} subtitle={l.sport} bottomDivider/>
          ))
        }
      </ScrollView>
    );
  }
}
