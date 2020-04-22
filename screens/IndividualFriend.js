import * as React from 'react';
import { Text } from 'react-native-elements';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import FriendMessageDialogModal from '../components/FriendMessageDialogModal';



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

  sendMessage(username, message) {
    SecureStore.getItemAsync('key').then((ukey) => {
      try{
        console.log(group_id);
        let response = fetch('https://sportsmoneynodejs.appspot.com/send_friend_message', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ukey: ukey,
              username: username,
              message:message,
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
          <FriendMessageDialogModal isVisible = {this.state.messageModal} onClose = {() => {this.setState({messageModal:false})}} onSubmit = {(message) => {this.setState({modal:false}); sendMessage(this.props.route.params.username, message)}}/>
          <Text>
              Hello, this is individual friend page...
          </Text>
        </React.Fragment>
      );
    }

}
