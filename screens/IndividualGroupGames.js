import * as React from 'react';
import {View, Button, ScrollView, RefreshControl} from 'react-native';
import {Text, ListItem} from 'react-native-elements';

export default class GroupGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesList: [],
      refreshing: false
    }
  }

  componentDidMount(){
    this.fetchGames();
  }

  fetchGames() {
    try {
      let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_games', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sport: this.props.route.params.groupSport
        })
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({gamesList: json});
        this.setState({refreshing: false});
      });
    } catch (err) {
      console.log(err);
    }
  }

  refreshList() {
    this.setState({refreshing: true});
    this.fetchGames();
    this.setState({refreshing: false});
  }

  render() {
    return (<ScrollView refreshControl={<RefreshControl refreshing = {
        this.state.refreshing
      }
      onRefresh = {
        () => this.refreshList()
      } />}>
      <View style={{alignItems: 'center', backgroundColor: 'lightgray'}}><Text>Upcoming Games</Text></View>
      {this.state.gamesList.map((l, i) => (<ListItem key={i} title={l.team1 + ' vs ' + l.team2} bottomDivider={true}/>))}
      {this.state.gamesList.length < 1 && (<View style={{alignItems: 'center', backgroundColor: 'white', paddingVertical: 10}}><Text style={{fontSize: 18}}>No Games Tomorrow!</Text></View>)}
      <View style={{alignItems: 'center', backgroundColor: 'lightgray', marginTop: 15}}><Text>Yesterday's Results</Text></View>
      <View style={{alignItems: 'center', backgroundColor: 'white', paddingVertical: 10}}><Text style={{fontSize: 18}}>No Previous Games!</Text></View>
    </ScrollView>);
  }
}
