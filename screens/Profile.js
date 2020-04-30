import * as React from 'react';
import { Text, ListItem, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Overlay, Button } from 'react-native-elements';
import { StyleSheet, RefreshControl,  View, Switch, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import { Logs } from 'expo';
import * as SecureStore from 'expo-secure-store';
import { clearUpdateCacheExperimentalAsync } from 'expo/build/Updates/Updates';
import { Ionicons } from '@expo/vector-icons';
import {getStyles} from '../styling/Styles';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numFriends: -1,
      numGroups: -1,
      numPoints: -1,
      username: "Profile Name",
      firstName: "First Name",
      lastName:"Last Name",
      bio: "Biography",
      bio2: '',
      refreshing: false,
      editingBio: false,
      theme: false,
      styles: {},
    }
    this.changeColorTheme = this.changeColorTheme.bind(this);
  }

  async componentDidMount() {
    this.fetchProfile();
    SecureStore.getItemAsync('theme').then((theme) => {
      if(theme == 'light'){
        this.setState({theme: false});
      }else{
        this.setState({theme: true});
      }
      console.log(theme);
    });
    let styles = await (async () => getStyles())();
    this.setState({styles: styles});
  }

  changeColorTheme = () => {
    if(this.state.theme){
      SecureStore.setItemAsync('theme', 'light');
    }else{
      SecureStore.setItemAsync('theme', 'dark');
    }
    this.setState({theme: !this.state.theme});
  }

fetchProfile() {
 this.fetchNumFriends();
 this.fetchNumGroups();
 this.fetchName();
 this.fetchBio();
 this.fetchNumPoints();
}

fetchName() {
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
        this.setState({numGroups: json.length});
        //this.setState({refreshing:false});
      });
    }catch(err){
      console.log(err);
    }
  });

}

fetchNumPoints() {
  SecureStore.getItemAsync('key').then((ukey) => {
    try{
      let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_total_points', {
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
        let total = 0;
        for (let index = 0; index < json.length; index++) {
          total += json[index].points;
        }
        this.setState({numPoints:total});
      });
    }catch(err){
      console.log(err);
    }
  });
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
        if(json.result == 'success'){
          this.setState({bio:json.bio});
          this.setState({refreshing:false});
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
      <ScrollView style={this.state.styles.ScrollView} refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>} >
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
            <Text style={[styles.topTextCenter, this.state.styles.Text]} >Points</Text>
            <Text style={[styles.topTextCenter, this.state.styles.Text]} >{this.state.numPoints}</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={[styles.topTextCenter, this.state.styles.Text]} >Friends</Text>
            <Text style={[styles.topTextCenter, this.state.styles.Text]} >{this.state.numFriends}</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={[styles.topTextCenter, this.state.styles.Text]} >Groups</Text>
            <Text style={[styles.topTextCenter, this.state.styles.Text]} >{this.state.numGroups}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'column'}}>
          <Text style={[styles.margin5, this.state.styles.Text]}>
            {this.state.firstName} {this.state.lastName}
          </Text>
          <Text style={[styles.margin5, this.state.styles.Text]}>
            Username: {this.state.username}
          </Text>
          <Text style={[styles.margin5, this.state.styles.Text]}>
            {this.state.bio}
          </Text>
        </View>
          <ListItem
            onPress={() => {this.setState({editingBio:true})}}
            title={"Edit Bio"}
            containerStyle={this.state.styles['ListItem.containerStyle']}
            titleStyle={this.state.styles['ListItem.titleStyle']}
            subtitleStyle={this.state.styles['ListItem.subtitleStyle']}
            chevron
            topDivider
            bottomDivider
          />

        <Overlay overlayStyle={this.state.styles.Overlay} isVisible={this.state.editingBio} height = {170}  onBackdropPress = {() => this.setState({editingBio:false})}>
            <View style={{flex:1,}}>
              <Text style = {[{marginTop: 5, marginBottom: 10, fontWeight:'bold', fontSize: 20}, this.state.styles.Text]}>Edit Bio</Text>
              <TextInput style = {[styles.input_container, this.state.styles.Input, {marginBottom: 15}]}
                onChangeText={(bio) => this.setState({bio2: bio})}
                value={this.state.bio2}
                placeholder = "Bio"
                underlineColorAndroid='transparent'
              />
              <View style = {{flexDirection:'row-reverse', alignSelf: "flex-end"}}>
                <View style={{width: 80}}>
                  <Button title = {"Submit"} type = {'clear'}  onPress={() => {
                    this.setState({editingBio:false})
                    this.submitBioChange()
                  }}/>
                </View>
                <View style={{width: 80}}>
                  <Button title = {"Cancel"} type = {'clear'} onPress = {() => this.setState({editingBio:false, bio2: ''})}/>
                </View>
              </View>
            </View>
          </Overlay>

          <ListItem
            title='Theme'
            containerStyle={this.state.styles['ListItem.containerStyle']}
            titleStyle={this.state.styles['ListItem.titleStyle']}
            subtitleStyle={this.state.styles['ListItem.subtitleStyle']}
            rightElement={
              <View style={{flexDirection: 'row'}}>
                <Ionicons name={'md-sunny'} size={25} style={this.state.styles.ColorThemePickerIcon}/>
                  <Switch
                    trackColor={{ false: "dodgerblue", true: 'dodgerblue' }}
                    thumbColor={this.state.theme ? 'dodgerblue' : 'dodgerblue'}
                    onChange={this.changeColorTheme}
                    value={this.state.theme}/>
                  <Ionicons name={'md-moon'} size={25} style={this.state.styles.ColorThemePickerIcon}/>
              </View>
            }
          />

          <ListItem
          onPress={() => {SecureStore.deleteItemAsync('key'); SecureStore.setItemAsync('theme', 'light'); this.props.navigation.reset({routes:[{name: "Login"}]});}}
          title={'Sign Out'}
          containerStyle={this.state.styles['ListItem.containerStyle']}
          titleStyle={this.state.styles['ListItem.titleStyle']}
          subtitleStyle={this.state.styles['ListItem.subtitleStyle']}
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
    },
    input_container:{
      textAlign:'left',
      fontSize: 16,
      color: 'rgba(0,0,0,0.54)',
      ...Platform.select({
        ios: {
          borderRadius: 5,
          paddingTop: 5,
  	      borderWidth: 1,
          borderColor: '#B0B0B0',
          paddingBottom: 5,
          paddingLeft: 10,
          marginBottom: 15,
          marginTop: 10,
        },
        android: {
          marginTop: 8,
          borderBottomWidth: 2,
          borderColor: 'dodgerblue',
        },
      }),
    },
})
