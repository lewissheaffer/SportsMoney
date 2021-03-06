import * as React from 'react';
import {View, Button, ScrollView, RefreshControl} from 'react-native';
import { Text } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GroupRankings from '../screens/IndividualGroupRankings';
import GroupGames from '../screens/IndividualGroupGames'
import { Ionicons } from '@expo/vector-icons';
import GroupUserDialogModal from "../components/GroupUserDialogModal";
import * as SecureStore from 'expo-secure-store';
import {connect} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

class IndividualGroupNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteModalVisible:false,
      styles: {}
    }
  }

  async componentDidMount() {
    this.props.navigation.setOptions({headerTitle: this.props.route.params.groupName, headerRight: () => (
    <Text style={[{marginRight:20,}, this.props.styles.styles.Text]} onPress = {() => {this.setState({inviteModalVisible:true})}}>Invite User</Text>)});
  }

  GroupMemberInvite(username) {
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
              group_id: this.props.route.params.group_id,
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

  render(){
  return (
    <React.Fragment>
      <GroupUserDialogModal onSubmit = {(username) => {this.GroupMemberInvite(username); this.setState({inviteModalVisible:false});} } isVisible = {this.state.inviteModalVisible} onClose = {() => {this.setState({inviteModalVisible:false})}}/>
      <Tab.Navigator
        tabBarOptions={{
          style: this.props.styles.styles.TopTab,
          activeTintColor: 'dodgerblue',
          inactiveTintColor: 'rgba(104, 171, 221, 0.69)',
          indicatorColor: 'dodgerblue'
        }}
      >
        <Tab.Screen name="Games" component={GroupGames} initialParams={{ groupSport: this.props.route.params.groupSport, group_id: this.props.route.params.group_id}}/>
        <Tab.Screen name="Rankings" component={GroupRankings} initialParams={{group_id: this.props.route.params.group_id}}/>
      </Tab.Navigator>
    </React.Fragment>
  );
  }
}

const mapStateToProps = (state) => {
  const {styles} = state;
  return {styles};
}

export default connect(mapStateToProps)(IndividualGroupNavigator);
