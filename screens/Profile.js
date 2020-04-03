import * as React from 'react';
import { Text, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
//import {Button} from 'react-native'



export default function Profile() {

    return (
      <Button title={"Logout"} onPress = {() => SecureStore.deleteItemAsync('key')}/>
    );
}
