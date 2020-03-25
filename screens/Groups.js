import * as React from 'react';
import { Text, ListItem} from 'react-native-elements';
import {View} from 'react-native';


const list = [
  {
    name: 'The All-Stars',
    subtitle: 'NBA'
  },
  {
    name: 'NFL 2019 League',
    subtitle: 'NFL',
  },
]

export default function Groups() {

    return (
      <View>
        {
          list.map((l, i) => (
            <ListItem key={i} title={l.name} subtitle={l.subtitle} bottomDivider/>
          ))
        }
      </View>
    );
}
