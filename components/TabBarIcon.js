import * as React from 'react';
import {
  Ionicons
} from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return ( <
    Ionicons name = {
      props.name
    }
    size = {
      40
    }
    style = {
      {
        marginBottom: -8
      }
    }
    color = {
      props.focused ? 'dodgerblue' : 'rgba(104, 171, 221, 0.69)'
    }
    />
  );
}