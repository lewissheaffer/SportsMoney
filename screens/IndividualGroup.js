import * as React from 'react';
import { Text } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default class IndividualGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

    render(){
      return (
        <Tab.Navigator>
          <Tab.Screen name="Game" component={Games}/>
          <Tab.Screen name="Rankings" component={Rankings}/>
        </Tab.Navigator>
      );
    }

}

export class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render(){
    return (
      <Text>This is an individualGrop</Text>
    );
  }
}

export class Rankings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render(){
    return (
      <Text>This is an individualGrop</Text>
    );
  }
}
