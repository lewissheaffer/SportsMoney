import * as React from 'react';
import { Text, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { StyleSheet, RefreshControl, View, Button, Overlay } from 'react-native';
import Colors from '../constants/Colors';
import { Logs } from 'expo';
import * as SecureStore from 'expo-secure-store';

const list = [

    {name: 'Change Username'},
    {name: 'Change Password'},
    {name: 'Add Friends'},
    {name: 'Notifications'},

]

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      numFriends: -1,
      numGroups: -1,
      numPoints: -1,
      profileName: "Profile Name",
      bio: "Biography",
      refreshing: false,

    }
  }

  editBio(newBio) {
    console.log("Hello");
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/edit_bio', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: ukey,
              bio: newBio
            }),
        })
        .then((response) => response.json())
        .then((json) => {
          if(json.result){
            alert('Bio edited');
          }
          else {
            alert('Error editing bio');
          }
        });
      }catch(err){
        console.log(err);
      }
    });
}

fetchProfile() {

//TODO fetch number of friends, points, and groups
 this.fetchNumFriends();



}

fetchNumFriends() {
  SecureStore.getItemAsync('key').then((ukey) => {
    try{
      let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_friends', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ukey: ukey
          }),
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({numFriends: json.array.size});
      });
    }catch(err){
      console.log(err);
    }
  });
}

refreshList() {
  this.setState({refreshing: true});
  this.fetchProfile();
  this.setState({refreshing:false})
}


displayEditBioOverlay() {

  //TODO create overlay and ask for a new bio for this profile


}

  render() {
    return (
      <ScrollView refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>} >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <View style={{ flexDirection: 'column' }}>
            <Avatar
              size="large"
              rounded
              title="DI"
              activeOpacity={0.7}
              containerStyle={styles.margin10}
            />
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.topTextCenter} >Points</Text>
            <Text style={styles.topTextCenter} >{this.state.numPoints}</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.topTextCenter} >Friends</Text>
            <Text style={styles.topTextCenter} >{this.state.numFriends}</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.topTextCenter} >Groups</Text>
            <Text style={styles.topTextCenter} >{this.state.numGroups}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'column'}}>
          <Text style={styles.margin5}>
            {this.state.profileName}
          </Text>
          <Text style={styles.margin5}>
            {this.state.bio}
          </Text>
        </View>
        {/* <View style={{marginTop: 40}} >
          {list.map((item, i) => (
            <ListItem
            containerStyle={styles.blue}
            key={i}
            title={item.name}
            chevron
            topDivider
            bottomDivider
            />
          ))} */}

          <ListItem
            onPress={() => {this.displayEditBioOverlay()}}
            title={"Edit Bio"}
            onPress
            chevron
            topDivider
            bottomDivider
          />
          <ListItem
          onPress={() => {SecureStore.deleteItemAsync('key'); this.props.navigation.reset({routes:[{name: "Login"}]});}}
          title={'Sign Out'}
          chevron
          topDivider
          bottomDivider
          />
        {/* </View> */}
      </ScrollView>
    );
  }






}




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
