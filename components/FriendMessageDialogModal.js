import * as React from 'react';
import { useState} from 'react';
import {View, Picker, TextInput, Platform, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Overlay, Text, Button, Input } from 'react-native-elements';
import {sendMessage} from '../screens/Inbox';
import {getStyles} from '../styling/Styles';
import {connect} from 'react-redux';

class FriendMessageDialogModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      message: '',
    }
  }

  render(){
    return (
      <Overlay overlayStyle={this.props.styles.styles.Overlay} isVisible={this.props.isVisible} height = {235}  onBackdropPress = {() => {this.props.onClose()}}>
        <View style={{flex:1,}}>
        <Text style = {[{marginTop: 5, marginBottom: 10, fontWeight:'bold', fontSize: 20}, this.props.styles.styles.Text]}>Send a message</Text>
        <Input inputStyle={this.props.styles.styles.Input} onChangeText = {(text) => this.setState({subject:text})} placeholder = "Subject" underlineColorAndroid='transparent' errorStyle={{color: 'red'}} errorMessage={this.state.subject ? '' : 'Subject cannot be blank.'} />
          <Input inputStyle={this.props.styles.styles.Input} onChangeText = {(text) => this.setState({message:text})} placeholder = "Message" underlineColorAndroid='transparent' errorStyle={{color: 'red'}} errorMessage={this.state.message ? '' : 'Message cannot be blank.'} />
          <View style = {{flexDirection:'row-reverse', alignSelf: "flex-end"}}>
            <View style={{width: 80}}>
              <Button title = {"Submit"} type = {'clear'} disabled={!this.state.message || !this.state.subject || (this.state.message > 140) || (this.state.subject > 20)} onPress = {() => {
                this.props.onSubmit(this.state.subject, this.state.message); this.setState({message: '', subject: ''});
              }}/>
            </View>
            <View style={{width: 80}}>
              <Button title = {"Cancel"} type = {'clear'} onPress = {() => this.props.onClose()}/>
            </View>
          </View>
        </View>
      </Overlay>
    );
  }
}

const mapStateToProps = (state) => {
  const {styles} = state;
  return {styles};
}

export default connect(mapStateToProps)(FriendMessageDialogModal);
