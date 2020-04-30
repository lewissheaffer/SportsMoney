import * as React from 'react';
import {View, Button, ScrollView, RefreshControl} from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {getStyles} from '../styling/Styles';

export default class GroupRankings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankingsList:[],
      refreshing: false,
      styles: {}
    }
  }

  async componentDidMount(){
    this.fetchRankings();
    let styles = await (async () => getStyles())();
    this.setState({styles: styles});
  }

  compare(x, y){
    if(x.points < y.points){
      return 1;
    }
    if(x.points > y.points){
      return -1;
    }
    return 0;
  }

  fetchRankings() {
    try {
      let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_rankings', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          group_id: this.props.route.params.group_id
        })
      })
      .then((response) => response.json())
      .then((json) => {
        json.sort(this.compare);
        this.setState({rankingsList: json});
        this.setState({refreshing: false});
      });
    } catch (err) {
      console.log(err);
    }
  }

  refreshList() {
    this.setState({refreshing: true});
    this.fetchRankings();
  }

  render(){
    return (
      <ScrollView style={this.state.styles.ScrollView} refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>}>
        {
          this.state.rankingsList.map((l, i) => (
            <ListItem
              key={i}
              title={`${l.first_name} ${l.last_name}: ${l.points} pts`}
              subtitle={l.username}
              containerStyle={this.state.styles['ListItem.containerStyle']}
              titleStyle={this.state.styles['ListItem.titleStyle']}
              subtitleStyle={this.state.styles['ListItem.subtitleStyle']}
              bottomDivider/>
          ))
        }
      </ScrollView>
    );
  }
}
