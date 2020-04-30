import * as React from 'react';
import {View, Button, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import {Text, ListItem} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import GamePickListItem from '../components/GamePickListItem';
import {getStyles} from '../styling/Styles';

export default class GroupGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesList: [],
      resultsList: [],
      refreshing: false,
      styles: {}
    }
  }

  async componentDidMount(){
    this.fetchGames();
    this.fetchResults();
    let styles = await (async () => getStyles())();
    this.setState({styles: styles});
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

  fetchResults() {
    SecureStore.getItemAsync('key').then((ukey) => {
      try {
        let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_results', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sport: this.props.route.params.groupSport,
            group_id: this.props.route.params.group_id,
            ukey: ukey
          })
        })
        .then((response) => response.json())
        .then((json) => {
          this.setState({resultsList: json});
          this.setState({refreshing: false});
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  refreshList() {
    this.setState({refreshing: true});
    this.fetchGames();
    this.fetchResults();
    this.setState({refreshing: false});
  }

  render() {
    return (
      <ScrollView style={this.state.styles.ScrollView} refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>}>
        <View style={this.state.styles['IndividualGroupGames.section_header']}><Text style={this.state.styles.Text}>Upcoming Games</Text></View>
        {this.state.gamesList.map((l, i) => (<GamePickListItem key={i} team1={l.team1} team2={l.team2} game_id={l.game_id} group_id={this.props.route.params.group_id} sport={this.props.route.params.groupSport}/>))}
        {this.state.gamesList.length < 1 && (<View style={this.state.styles['IndividualGroupGames.empty']}><Text style={this.state.styles['IndividualGroupGames.empty.text']}>No Games Tomorrow!</Text></View>)}
        <View style={[this.state.styles['IndividualGroupGames.section_header'], {marginTop: 20}]}><Text style={this.state.styles.Text}>Yesterday's Results</Text></View>
        {this.state.resultsList.map((l, i) => (<ListItem
          key={i}
          title={
            <View>
              <Text style={[{marginBottom: 5}, this.state.styles.Text]}>{l.team1}: <Text style={l.team1_points > l.team2_points ? {color: 'chartreuse'} : {color: 'red'}}>{l.team1_points}</Text></Text>
              <Text style={this.state.styles.Text}>{l.team2}: <Text style={l.team1_points < l.team2_points ? {color: 'chartreuse'} : {color: 'red'}}>{l.team2_points}</Text></Text>
            </View>
          }
          rightElement={
            <Text style={[l.correct == 1 ? {color: 'chartreuse'} : this.state.styles.Text, {fontSize: 22}]}>{l.correct == 1 ? '+25' : '+0'}</Text>
          }
          containerStyle={this.state.styles['ListItem.containerStyle']}
          titleStyle={this.state.styles['ListItem.titleStyle']}
          subtitleStyle={this.state.styles['ListItem.subtitleStyle']}
          bottomDivider={true}/>))}
        {this.state.resultsList.length < 1 && (<View style={this.state.styles['IndividualGroupGames.empty']}><Text style={this.state.styles['IndividualGroupGames.empty.text']}>No Previous Games!</Text></View>)}
      </ScrollView>
    );
  }

}
