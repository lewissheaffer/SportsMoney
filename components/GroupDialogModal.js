import * as React from 'react';
import { useState} from 'react';
import {View, Picker, TextInput, Platform, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Overlay, Text, Button, Input } from 'react-native-elements';
import {connect} from 'react-redux';

class GroupDialogModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      selectedValue: "NBA",
      exists: false,
      sport:"",
      Findgroupname: "",
    }
  }

  checkGroup = (g_id) => {
    try{
      let response = fetch('https://sportsmoneynodejs.appspot.com/check_groups', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            group_id: g_id,
          }),
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({exists: json.exists});
          this.setState({sport: json.sport});
          this.setState({Findgroupname: json.name});
      });
    }catch(err){
      console.log(err);
    }
  }
  render(){
    return (
      <Overlay overlayStyle={this.props.styles.styles.Overlay} isVisible={this.props.isVisible} height = {225}  onBackdropPress = {() => {this.props.onClose()}}>
        <View style={{flex:1,}}>
          <Text style = {[{marginTop: 5, marginBottom: 10, fontWeight:'bold', fontSize: 20}, this.props.styles.styles.Text]}>Create a Group</Text>
          <TextInput style = {[styles.input_container, this.props.styles.styles.Input]} onChangeText = {(text) => {this.setState({groupName:text})}} placeholder = "Group Name" underlineColorAndroid='transparent' />
          <Text style = {[{marginTop: 15, marginBottom: 0,}, this.props.styles.styles.Text]}>Select League</Text>
          <Picker style={[{ height: 50, width: 150}, this.props.styles.styles.Picker]} selectedValue={this.state.selectedValue} onValueChange={(itemValue, itemIndex) => this.setState({selectedValue:itemValue})}>
            <Picker.Item label="NBA" value="NBA" />
            <Picker.Item label="NFL" value="NFL" />
            <Picker.Item label="MLB" value="MLB" />
            <Picker.Item label="NHL" value="NHL" />
          </Picker>
          <View style = {{flexDirection:'row-reverse', alignSelf: "flex-end"}}>
            <View style={{width: 80}}>
              <Button title = {"Submit"} type = {'clear'} disabled={this.state.groupName.length < 1} onPress = {() => this.props.onSubmit(this.state.groupName, this.state.selectedValue)}/>
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

export default connect(mapStateToProps)(GroupDialogModal);

const styles = StyleSheet.create({
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
});
