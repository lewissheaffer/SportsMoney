import * as React from 'react';
import { Text, ListItem} from 'react-native-elements';
import {View, Button} from 'react-native';
import {useState} from 'react';

export default function Groups() {

    let [list, setList] = useState([]);

    return (
      <View>
        <Button
          onPress={() => {
            try{
              console.log("fetching groups");
              let response = fetch('https://sportsmoneynodejs.appspot.com/get_groups_test')
              .then((response) => response.json())
              .then((json) => {
                setList(json);
              });
            }catch(err){
              console.log(err);
            }
          }}
          title="test"
        />
        {
          list.map((l, i) => (
            <ListItem key={i} title={l.name} subtitle={l.subtitle} bottomDivider/>
          ))
        }
      </View>
    );

}
