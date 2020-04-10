import * as React from 'react';
import { Text, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { StyleSheet, View, Button } from 'react-native';
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
    }
  }

  render() {
    return (
      <ScrollView style={styles.blue} >
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
            <Text style={styles.topTextCenter} >1000</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.topTextCenter} >Friends</Text>
            <Text style={styles.topTextCenter} >2</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.topTextCenter} >Groups</Text>
            <Text style={styles.topTextCenter} >0</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'column'}}>
          <Text style={styles.margin5}>
            David Imhoff
          </Text>
          <Text style={styles.margin5}>
            Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum enim elit, nec venenatis nisl euismod pulvinar. Donec pharetra sem et odio blandit lacinia. Nam.
          </Text>
        </View>
        <View style={{marginTop: 40}} >
          {list.map((item, i) => (
            <ListItem
            containerStyle={styles.blue}
            key={i}
            title={item.name}
            chevron
            topDivider
            bottomDivider
            />
          ))}
          <ListItem
          containerStyle={styles.blue}
          onPress={() => {SecureStore.deleteItemAsync('key'); this.props.navigation.reset({routes:[{name: "Login"}]});}}
          title={'Sign Out'}
          chevron
          topDivider
          bottomDivider
          />
        </View>
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
