import * as React from 'react';
import {View, Button, ScrollView, RefreshControl} from 'react-native';
import { Text } from 'react-native-elements';

export default class GroupGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesList:[],
      refreshing: false,
    }
  }

  refreshList() {
    this.setState({refreshing: true});
    //Include call to fetch values to refresh list
    this.setState({refreshing:false});
  }

  render(){
    return (
      <ScrollView refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>}>
        {
          this.state.gamesList.map((l, i) => (
            <ListItem key={i} title={l.name} subtitle={l.sport} bottomDivider/>
          ))
        }
        <Text>Test text</Text>
      </ScrollView>
    );
  }
}
