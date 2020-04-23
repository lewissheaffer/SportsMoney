import * as React from 'react';
import { Text } from 'react-native-elements';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import FriendMessageDialogModal from '../components/FriendMessageDialogModal';
import * as SecureStore from 'expo-secure-store';


export default class IndividualFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageModal:false,
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({headerTitle: this.props.route.params.first_name + " " + this.props.route.params.last_name, headerRight: () => (
      <MaterialCommunityIcons name={'message-plus'} size={35} style={{marginRight:20, }} onPress = {() => {this.setState({messageModal:true})}}/>
    )})
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

    render(){
      return (
        <React.Fragment>
          <FriendMessageDialogModal isVisible = {this.state.messageModal} onClose = {() => {this.setState({messageModal:false})}} onSubmit = {(subject, message) => {this.setState({messageModal:false}); this.sendMessage(this.props.route.params.username, subject, message)}}/>
          <Text>
              Hello, this is individual friend page...
          </Text>
        </React.Fragment>
      );
    }

}
