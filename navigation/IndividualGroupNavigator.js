import * as React from 'react';
import {View, Button, ScrollView, RefreshControl} from 'react-native';
import { Text } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GroupRankings from '../screens/IndividualGroupRankings';
import GroupGames from '../screens/IndividualGroupGames'
const Tab = createMaterialTopTabNavigator();

export default class IndividualGroupNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    this.props.navigation.setOptions({headerTitle: this.props.route.params.groupName});
  }
  render(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Games" component={GroupGames} initialParams={{ groupSport: this.props.route.params.groupSport }}/>
      <Tab.Screen name="Rankings" component={GroupRankings}/>
    </Tab.Navigator>
  );
  }
}

export function GroupMemberInvite(username, group_id) {
  SecureStore.getItemAsync('key').then((ukey) => {
    try{
      let response = fetch('https://sportsmoneynodejs.appspot.com/add_group_member', {
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
        if(json.already_member){
          alert('This user is already a member');
        }
      });
    }catch(err){
      console.log(err);
    }
  });
}
