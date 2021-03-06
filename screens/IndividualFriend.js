import * as React from 'react';
import { Text, ListItem, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Overlay } from 'react-native-elements';
import FriendMessageDialogModal from '../components/FriendMessageDialogModal';
import * as SecureStore from 'expo-secure-store';
import Colors from '../constants/Colors';
import {  StyleSheet, RefreshControl,  View, Button} from 'react-native';
import Profile from './Profile';
import {connect} from 'react-redux';

class IndividualFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageModal:false,
      numFriends: -1,
      numGroups: -1,
      numPoints: 0,
      username: "Profile Name",
      firstName: "First Name",
      lastName:"Last Name",
      ukey: this.props.route.params.ukey,
      bio: "Biography",
      refreshing: false,
    }
  }

  async componentDidMount() {
    this.refreshList();
    this.props.navigation.setOptions({headerTitle: this.props.route.params.first_name + " " + this.props.route.params.last_name, headerRight: () => (
      <MaterialCommunityIcons name={'message-plus'} size={35} style={this.props.styles.styles.HeaderIcon} onPress = {() => {this.setState({messageModal:true})}}/>
    )});
  }

  sendMessage(username, subject, message) {
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/send_friend_message', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: ukey,
              username: username,
              subject:subject,
              contents:message,
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
  fetchNumFriends() {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_friends', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: this.state.ukey
            }),
        })
        .then((response) => response.json())
        .then((json) => {
          this.setState({numFriends:json.length});
          //this.setState({refreshing:false})
        });
      }catch(err){
        console.log(err);
      }

  }

  fetchNumGroups() {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_groups', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: this.state.ukey
            }),
        })
        .then((response) => response.json())
        .then((json) => {
          this.setState({numGroups: json.length});
          //this.setState({refreshing:false});
        });
      }catch(err){
        console.log(err);
      }

  }

  fetchName() {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_user_by_ukey', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: this.state.ukey
            }),
        })
        .then((response) => response.json())
        .then((json) => {
        //  console.log(json);
          this.setState({firstName:json.first_name});
          this.setState({lastName:json.last_name});
          this.setState({username:json.username});
          //this.setState({refreshing:false})
        });
      }catch(err){
        console.log("name error: "+err);
      }
  }

  fetchBio() {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_bio', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: this.state.ukey
            }),
        })
        .then((response) => response.json())
        .then((json) => {
          if(json.result == 'success'){
            this.setState({bio:json.bio});
          this.setState({refreshing:false});
          }
          else {
            alert('Error fetching bio');
          }
        });
      }catch(err){
        console.log(err);
      }
  }
  fetchNumPoints() {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_total_points', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: this.state.ukey
            }),
        })
        .then((response) => response.json())
        .then((json) => {
          let total = 0;
          for (let index = 0; index < json.length; index++) {
            total += json[index].points;
          }
          this.setState({numPoints:total});
        });
      }catch(err){
        console.log(err);
      }
  }

  deleteFriend() {
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        console.log(ukey + "   " + this.state.ukey);
        let response = fetch('https://sportsmoneynodejs.appspot.com/delete_friend', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey1: ukey,
              ukey2: this.state.ukey
            }),
        })
        .then((response) => response.json())
        .then((json) => {
        });
      }catch(err){
        console.log(err);
      }
    });

    this.props.navigation.goBack();

  }

  fetchProfile() {
    this.fetchNumFriends();
    this.fetchNumGroups();
    this.fetchName();
    this.fetchBio();
    this.fetchNumPoints();
   }

  refreshList() {
    this.setState({refreshing: true});
    this.fetchProfile();
  }



    render(){
      return (
        <React.Fragment>
          <FriendMessageDialogModal isVisible = {this.state.messageModal} onClose = {() => {this.setState({messageModal:false})}} onSubmit = {(subject, message) => {this.setState({messageModal:false}); this.sendMessage(this.props.route.params.username, subject, message)}}/>

          <ScrollView style={this.props.styles.styles.ScrollView} refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>} >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <View style={{ flexDirection: 'column' }}>
            <Avatar
              size="large"
              rounded
              title= {this.state.firstName.charAt(0) + this.state.lastName.charAt(0)}
              activeOpacity={0.7}
              containerStyle={styles.margin10}
            />
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={[styles.topTextCenter, this.props.styles.styles.Text]} >Points</Text>
            <Text style={[styles.topTextCenter, this.props.styles.styles.Text]} >{this.state.numPoints}</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={[styles.topTextCenter, this.props.styles.styles.Text]} >Friends</Text>
            <Text style={[styles.topTextCenter, this.props.styles.styles.Text]} >{this.state.numFriends}</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={[styles.topTextCenter, this.props.styles.styles.Text]} >Groups</Text>
            <Text style={[styles.topTextCenter, this.props.styles.styles.Text]} >{this.state.numGroups}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'column'}}>
          <Text style={[styles.margin5, this.props.styles.styles.Text]}>
            {this.state.firstName} {this.state.last_name}
          </Text>
          <Text style={[styles.margin5, this.props.styles.styles.Text]}>
            Username: {this.state.username}
          </Text>
          <Text style={[styles.margin5, this.props.styles.styles.Text]}>
            {this.state.bio}
          </Text>
        </View>

        <ListItem
            onPress={() => {this.deleteFriend()}}
            title={"Delete Friend"}
            containerStyle={this.props.styles.styles['ListItem.containerStyle']}
            titleStyle={this.props.styles.styles['ListItem.titleStyle']}
            subtitleStyle={this.props.styles.styles['ListItem.subtitleStyle']}
            chevron
            topDivider
            bottomDivider
          />


      </ScrollView>
        </React.Fragment>
      );
    }
}

const mapStateToProps = (state) => {
  const {styles} = state;
  return {styles};
}

export default connect(mapStateToProps)(IndividualFriend);

const styles = StyleSheet.create({
  blue: {
      backgroundColor: Colors.tintColor
  },
  margin10: {
      margin: 10
  },
  margin5: {
      margin: 5
  },
  topTextCenter: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      marginLeft: 10
  }


})
