import * as React from 'react';
import {View, Button, ScrollView, RefreshControl} from 'react-native';
import { Text } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GroupRankings from '../screens/IndividualGroupRankings';
import GroupGames from '../screens/IndividualGroupGames'
import { Ionicons } from '@expo/vector-icons';
const Tab = createMaterialTopTabNavigator();

export default class IndividualGroupNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteModalVisible:false,
    }
  }
  componentDidMount() {
    this.props.navigation.setOptions({headerTitle: this.props.route.params.groupName, headerRight: () => (
      <Text style={{marginRight:20, }} onPress = {() => {this.setState({inviteModalVisible:true})}}>Invite User</Text>)}}/>)});
  }
  render(){
  return (
    <React.Fragment>
      <GroupUserDialogModal group_id = {this.props.route.params.group_id} isVisible = {this.state.inviteModalVisible} onClose = {() => {this.setState({inviteModalVisible:false})}}/>
    </React.Fragment>
      <Tab.Navigator>
        <Tab.Screen name="Games" component={GroupGames} initialParams={{ groupSport: this.props.route.params.groupSport }}/>
        <Tab.Screen name="Rankings" component={GroupRankings}/>
      </Tab.Navigator>
    </React.Fragment>
  );
  }
}
_id
export function GroupMemberInvite(username, groupname) {
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
            usern_id userna_id
            groupname: groupname,
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
