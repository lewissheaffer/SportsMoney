import * as React from 'react';
import { Text, ListItem} from 'react-native-elements';
import {View, Button} from 'react-native';
import {useState} from 'react';

export default function Groups() {

    let [list, setList] = useState([]);

    return (
      <View>
        {
          list.map((l, i) => (
            <ListItem key={i} title={l.name} subtitle={l.sport} bottomDivider/>
          ))
        }
      </View>
    );
}

export function createGroup() {
    try{
      console.log("fetching groups");
      let response = fetch('https://sportsmoneynodejs.appspot.com/get_groups_test', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'DBImhoff',
            name:"TestGroup#1",
            sport: 'Basketball',
          }),
      })
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        setList(json);
      });
    }catch(err){
      console.log(err);
    }
}
