import * as React from 'react';
import { Text, ListItem} from 'react-native-elements';
import {View, Button} from 'react-native';
import {useState} from 'react';

export default function Groups() {
  let [list, setList] = useState([]);
    return (

      <View>
      <Button title="Hello" onPress = {() =>{
        try{
          console.log("fetching groups");
          let response = fetch('https://sportsmoneynodejs.appspot.com/create_group', {
            method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: "lewiss",
                name: "Test Group",
                sport: "NBA",
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
      }}/>
        {
          list.map((l, i) => (
            <ListItem key={i} title={l.name} subtitle={l.sport} bottomDivider/>
          ))
        }
      </View>
    );
}

export function createGroup(username, name, sport) {
    try{
      console.log("fetching groups");
      let response = fetch('https://sportsmoneynodejs.appspot.com/create_group', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            name: name,
            sport: sport,
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

export function fetchGroups(username) {
}
