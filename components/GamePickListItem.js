import * as React from 'react';
import {
  View,
  Button,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  Text,
  ListItem
} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import {connect} from 'react-redux';

class GamePickListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team1: this.props.team1,
      team2: this.props.team2,
      game_id: this.props.game_id,
      sport: this.props.sport,
      pick: '',
    }
  }

  async componentDidMount(){
    this.fetchPick();
  }

  updatePick(){
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/update_pick', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: ukey,
              game_id: this.state.game_id,
              group_id: this.props.group_id,
              pick: this.state.pick,
              sport: this.state.sport
            }),
        })
        .then((response) => response.json())
        .then((json) => {
        });
      }catch(err){
        console.log(err);
      }
    });
  }

  fetchPick(){
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_pick', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: ukey,
              game_id: this.state.game_id,
              group_id: this.props.group_id,
              sport: this.state.sport
            }),
        })
        .then((response) => response.json())
        .then((json) => {
          if(json.exists){
            this.setState({pick: json.pick});
          }
        });
      }catch(err){
        console.log(err);
      }
    });
  }

  render() {
    return (
      <View style = {this.props.styles.styles['GamePickListItem.View']} >
        <TouchableOpacity style={[this.props.styles.styles['GamePickListItem.TouchableOpacity'], (this.state.pick == this.state.team1 && {backgroundColor: 'chartreuse'})]} onPress={() => {this.setState({pick: this.state.team1}); this.updatePick();}}><Text style={this.state.pick == this.state.team1 ? {color: 'black'} : this.props.styles.styles.Text}>{this.state.team1}</Text></TouchableOpacity>
        <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}, this.props.styles.styles.Header]}><Text style={this.props.styles.styles.Text}>vs</Text></View>
        <TouchableOpacity style={[this.props.styles.styles['GamePickListItem.TouchableOpacity'], (this.state.pick == this.state.team2 && {backgroundColor: 'chartreuse'})]} onPress={() => {this.setState({pick: this.state.team2}); this.updatePick();}}><Text style={this.state.pick == this.state.team2 ? {color: 'black'} : this.props.styles.styles.Text}>{this.state.team2}</Text></TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {styles} = state;
  return {styles};
}

export default connect(mapStateToProps)(GamePickListItem);

const styles = StyleSheet.create({
  TouchableOpacity: {
    padding: 15,
    flex: 6,
    alignItems: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'lightgray'
  }
});
