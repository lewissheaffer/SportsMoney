import * as React from 'react';
import { useState} from 'react';
import {View, Picker} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import GroupNavigator from '../navigation/GroupNavigator';
import FriendsNavigator from '../navigation/FriendsNavigator';
import InboxNavigator from '../navigation/InboxNavigator';
import Friends from '../screens/Friends';
import Inbox from '../screens/Inbox';
import Profile from '../screens/Profile';
import { Overlay, Text, Button, Input } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Groups';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerShown: (getHeaderTitle(route) !== "Groups") && (getHeaderTitle(route) !== "Friends") && (getHeaderTitle(route) !== "Inbox"), headerTitle: getHeaderTitle(route), headerLeft: null});

  return (
    <React.Fragment>
      <BottomTab.Navigator
        initialRouteName={INITIAL_ROUTE_NAME}
        tabBarOptions = {{
          style: route.params.styles.BottomTab,
          activeTintColor: 'dodgerblue',
          inactiveTintColor: 'rgba(104, 171, 221, 0.69)'
        }}>
        <BottomTab.Screen
          name="Groups"
          component={GroupNavigator}
          options={{
            title: 'Groups',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-basketball"/>,
          }}
        />
        <BottomTab.Screen
          name="Friends"
          component={FriendsNavigator}
          options={{
            title: 'Friends',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-people"/>,
          }}
        />
        <BottomTab.Screen
          name="Inbox"
          component={InboxNavigator}
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
