import * as React from 'react';
import { Text, ListItem} from 'react-native-elements';
import {View, Button, ScrollView, RefreshControl, Alert, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import MessageModal from "../components/MessageModal";
import {connect} from 'react-redux';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      refreshing: false,
      modalVisible: false,
      subject: '',
      message:'',
      styles: {}
    }
  }

  async componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages() {
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/fetch_messages', {
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
          this.setState({list:json});
          this.setState({refreshing:false});
        });
      }catch(err){
        console.log(err);
      }
    });
  }

  refreshList() {
    this.setState({refreshing: true});
    this.fetchMessages();
  }

  sendResponse(type, senderUsername, group_id, accepted, subject) {
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        let response = fetch('https://sportsmoneynodejs.appspot.com/handle_invite_request', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: ukey,
              accepted: accepted,
              type: type,
              senderUsername: senderUsername,
              group_id: group_id,
              subject: subject,
            }),
        })
        .then((response) => response.json())
        .then((json) => {
          this.refreshList();

        });
      }catch(err){
        console.log(err);
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <MessageModal isVisible = {this.state.modalVisible} subject={this.state.subject} message={this.state.message} onClose = {() => {this.setState({modalVisible:false})}}/>
        <ScrollView style={this.props.styles.styles.ScrollView} refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshList()}/>}>
          {
            this.state.list.map((l, i) => (
              <ListItem key={i}
                containerStyle={this.props.styles.styles['ListItem.containerStyle']}
                titleStyle={this.props.styles.styles['ListItem.titleStyle']}
                title = {
                  <React.Fragment>
                  {
                    (l.type =='friend') && <Text style = {[{fontSize: 17,}, this.props.styles.styles.Text]}>{'Friend Request from: ' + l.username}</Text>
                  }
                  {
                    (l.type =='group') && <Text style = {[{fontSize: 17,}, this.props.styles.styles.Text]}>{'Group Invite from: ' + l.username}</Text>
                  }
                  {
                    (l.type == 'message') && <Text style = {[{fontSize: 17,}, this.props.styles.styles.Text]}>{'Message from: ' + l.username}</Text>
                  }

                  </React.Fragment>
                }
                subtitleStyle={this.props.styles.styles['ListItem.subtitleStyle']}
                onPress = {() => {if (l.type == "message") {this.setState({subject:l.subject, message:l.contents, modalVisible:true});}}} subtitle={
                <React.Fragment>
                 {
                   (l.type =='friend') && <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                     <Text style = {[{fontSize: 17,}, this.props.styles.styles.Text]}>{''}</Text>
                     <View style = {{flexDirection:'row', justifyContent:'flex-end'}}>
                       <TouchableOpacity onPress = {() => {this.sendResponse(l.type, l.username, l.group_id, true)}}>
                          <Ionicons name={'md-checkmark-circle'} color = 'green' size={35} style={{marginRight:20, }}/>
                       </TouchableOpacity>
                       <TouchableOpacity onPress = {() => {this.sendResponse(l.type, l.username, l.group_id, false)}}>
                          <Ionicons name={'md-close-circle'} Title="Deny" color = 'red' size={35} style={{marginRight:10, }} />
                       </TouchableOpacity>
                      </View>
                    </View>
                 }
                 {
                     (l.type =='group') && <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                       <Text style = {[{fontSize: 17,}, this.props.styles.styles.Text]}>{''}</Text>
                      <View style = {{flexDirection:'row', alignItems:'flex-end'}}>
                         <TouchableOpacity onPress = {() => {this.sendResponse(l.type, l.username, l.group_id, true, l.subject)}}>
                            <Ionicons name={'md-checkmark-circle'} color = 'green' size={35} style={{marginRight:20, }}/>
                         </TouchableOpacity>
                         <TouchableOpacity onPress = {() => {this.sendResponse(l.type, l.username, l.group_id, false, l.subject)}}>
                            <Ionicons name={'md-close-circle'} Title="Deny" color = 'red' size={35} style={{marginRight:10, }} />
                         </TouchableOpacity>
                      </View>
                    </View>
                 }
                 {
                   (l.type == 'message') && <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                     <Text style = {[{fontSize: 17,}, this.props.styles.styles.Text]}>{'Tap to view'}</Text>
                     <Text style = {[{fontSize: 17,}, this.props.styles.styles.Text]}>{""}</Text>
                     <TouchableOpacity onPress = {() => {this.sendResponse(l.type, l.username, l.group_id, false, l.subject)}}>
                        <Ionicons name={'md-close-circle'} Title="Delete" color = 'red' size={35} style={{marginRight:10, }} />
                     </TouchableOpacity>
                  </View>
                 }
                 </React.Fragment>
              }
              bottomDivider
              />
            ))
          }
        </ScrollView>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const {styles} = state;
  return {styles};
}

export default connect(mapStateToProps)(Inbox);

export function sendMessage(username, subject, message) {
  SecureStore.getItemAsync('key').then((ukey) => {
    try{
      let response = fetch('https://sportsmoneynodejs.appspot.com/send_message', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ukey: ukey,
            username: username,
            subject: subject,
            message: message
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
