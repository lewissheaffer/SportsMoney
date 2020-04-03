import * as React from 'react';
import { useState} from 'react';
import {View, Picker} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import GroupDialogModal from '../components/GroupDialogModal';
import Groups from '../screens/Groups';
import {createGroup} from '../screens/Groups'
import Friends from '../screens/Friends';
import Inbox from '../screens/Inbox';
import Profile from '../screens/Profile';
import { Ionicons } from '@expo/vector-icons';
import { Overlay, Text, Button, Input } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Groups';

export default function BottomTabNavigator({ navigation, route }) {

  const [modal, toggleModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("NBA");

  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route), headerRight: () => (
    //So the "Icon only gets displayed when"
    (getHeaderTitle(route) == "Groups") && <Ionicons name={'md-add-circle-outline'} size={35} style={{marginRight:20, }} onPress = {() => {toggleModal(true)}}/> )
  });

  return (
    <React.Fragment>
      <GroupDialogModal isVisible = {modal} onClose = {() => toggleModal(false)} onSubmit = {(groupName,league) => {toggleModal(false); createGroup(groupName,league)}}/>

      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} tabBarOptions = {{style: {height:55}}}>
        <BottomTab.Screen
          name="Groups"
          component={Groups}
          options={{
            title: 'Groups',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-basketball"/>,
          }}
        />
        <BottomTab.Screen
          name="Friends"
          component={Friends}
          options={{
            title: 'Friends',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-people"/>,
          }}
        />
        <BottomTab.Screen
          name="Inbox"
          component={Inbox}
          options={{
            title: 'Inbox',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-mail"/>,
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-person"/>,
          }}
        />
      </BottomTab.Navigator>
    </React.Fragment>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  return routeName;
}
