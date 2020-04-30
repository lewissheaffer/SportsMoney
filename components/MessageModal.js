import * as React from 'react';
import { useState} from 'react';
import {View, Picker, TextInput, Platform, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Overlay, Text, Button, Input } from 'react-native-elements';
import {getStyles} from '../styling/Styles';


export default class MessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {}
    }
  }

  async componentDidMount() {
    let styles = await (async () => getStyles())();
    this.setState({styles: styles});
  }

  render(){
    return (
      <Overlay overlayStyle={this.state.styles.Overlay} isVisible={this.props.isVisible} height = {150}  onBackdropPress = {() => {this.props.onClose()}}>
        <View style={{flex:1,}}>
          <Text style = {[{marginTop: 5, marginBottom: 10, fontWeight:'bold', fontSize: 20}, this.state.styles.Text]}>{this.props.subject}</Text>
          <Text style = {[{marginTop: 5, marginBottom: 10, fontSize: 20}, this.state.styles.Text]}>{this.props.message}</Text>
          <View style = {{flexDirection:'row-reverse', alignSelf: "flex-end"}}>
            <View style={{width: 80}}>
              <Button title = {"Close"} type = {'clear'} onPress = {() => this.props.onClose()}/>
            </View>
          </View>
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  input_container:{
    textAlign:'left',
    fontSize: 16,
    color: 'rgba(0,0,0,0.54)',
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
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
