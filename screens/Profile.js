import * as React from 'react';
import { Text, ListItem, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Overlay } from 'react-native-elements';
import { StyleSheet, RefreshControl,  View, Button } from 'react-native';
import Colors from '../constants/Colors';
import { Logs } from 'expo';
import * as SecureStore from 'expo-secure-store';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      numFriends: -1,
      numGroups: -1,
      numPoints: 0,
      username: "Profile Name",
      firstName: "First Name",
      lastName:"Last Name",
      bio: "Biography",
      refreshing: false,
      editingBio: false,


    }
  }

  componentDidMount() {
    this.fetchProfile();
  }

fetchProfile() {

//TODO fetch number of friends, points, and groups
 this.fetchNumFriends();
 this.fetchNumGroups();
 this.fetchName();
 this.fetchBio();


}

fetchName() {
  console.log("In fetchName");
  SecureStore.getItemAsync('key').then((ukey) => {
    try{
      let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_user_by_ukey', {
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
      //  console.log(json);
        this.setState({firstName:json.first_name});
        this.setState({lastName:json.last_name});
        this.setState({username:json.username});
        //this.setState({refreshing:false})
      });
    }catch(err){
      console.log("name error: "+err);
    }
  });


}

fetchNumFriends() {
  console.log("In fetchNumFriends");
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
       // console.log(json);
        this.setState({numFriends:json.length});
        //this.setState({refreshing:false})
      });
    }catch(err){
      console.log(err);
    }
  });
}

fetchNumGroups() {

  console.log("In fetch Num Groups");
  SecureStore.getItemAsync('key').then((ukey) => {
    try{
      let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_groups', {
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
        console.log("numGroups = " + json.length);
        this.setState({numGroups: json.length});
        this.setState({refreshing:false});
      });
    }catch(err){
      console.log(err);
    }
  });

}

fetchNumPoints() {
//TODO , no points rn
}

refreshList() {
  this.setState({refreshing: true});
  this.fetchProfile();
}

fetchBio() {
  SecureStore.getItemAsync('key').then((ukey) => {
    try{
      let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_bio', {
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
        if(json.result == 'success'){
          this.setState({bio:json.bio})
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

submitBioChange() {
  console.log("In submitBioChange");
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
            bio: this.state.bio
          }),
      })
      .then((response) => response.json())
      .then((json) => {
       // console.log(json);
        if(json.result){
          console.log("Success, editiing bio!!!");
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

  render() {
    return (
      <ScrollView  refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>} >
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
            {this.state.firstName} {this.state.lastName}
          </Text>
          <Text style={styles.margin5}>
            Username: {this.state.username}
          </Text>
          <Text style={styles.margin5}>
            {this.state.bio}
          </Text>
        </View>
          <ListItem
            onPress={() => {this.setState({editingBio:true})}}
            title={"Edit Bio"}
            chevron
            topDivider
            bottomDivider
          />
          <Overlay
            isVisible={this.state.editingBio}
            windowBackgroundColor="rgba(100,100,100,.7)"
            height="auto"
            onBackdropPress={() => this.setState({editingBio:false})}
          >
            <React.Fragment>
              <Text style={styles.margin10}>
                Edit Bio
              </Text>
              <Input
                placeholder='New Bio'
                value = {this.state.bio}
                onChangeText={(bio) => this.setState({bio})}
              />
              <Button
              title="Cancel"
              color="blue"
              onPress={() => {
                this.setState({editingBio:false})
              }}></Button>
              <Button
               title="Confirm"
               color="blue"
               onPress={() => {
                 this.setState({editingBio:false})
                 this.submitBioChange()
                 }}
              >
              </Button>
            </React.Fragment>
          </Overlay>

          <ListItem
          onPress={() => {SecureStore.deleteItemAsync('key'); this.props.navigation.reset({routes:[{name: "Login"}]});}}
          title={'Sign Out'}
          chevron
          topDivider
          bottomDivider
          />
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
