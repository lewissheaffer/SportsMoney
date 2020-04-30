import {
  StyleSheet,
  Platform
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

const light = {

  'GamePickListItem.View': {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    flexDirection: 'row'
  },

  'GamePickListItem.TouchableOpacity': {
    padding: 15,
    flex: 6,
    alignItems: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'white'
  },

  'IndividualGroupGames.empty': {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10
  },

  'IndividualGroupGames.empty.text': {
    color: 'black',
    fontSize: 18
  },

  'IndividualGroupGames.section_header': {
    alignItems: 'center',
    backgroundColor: 'lightgray'
  },

  'ListItem.containerStyle': {
    backgroundColor: 'white'
  },

  'ListItem.titleStyle': {
    color: 'black'
  },

  'ListItem.subtitleStyle': {
    color: '#222222'
  },

  'ScrollView': {
    backgroundColor: '#e7e7e7'
  },

  'BottomTab': {
    backgroundColor: 'white',
    height: 55
  },

  'Header': {
    backgroundColor: 'white'
  },

  'HeaderTitle': {
    color: 'black',
    fontSize: 22
  },

  'HeaderIcon': {
    color: 'black',
    marginRight: 20,
    marginLeft: 20
  },

  'ColorThemePickerIcon': {
    color: 'black'
  },

  'Text': {
    color: 'black',
  },

  'Overlay': {
    backgroundColor: 'white'
  },

  'Input': {
    color: 'black'
  },

  'Picker': {
    color: 'black',
    backgroundColor: 'white'
  },

  'TopTab': {
    backgroundColor: 'white',
  }

}

const dark = {

  'GamePickListItem.View': {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#3e3e3e',
    flexDirection: 'row'
  },

  'GamePickListItem.TouchableOpacity': {
    padding: 15,
    flex: 6,
    alignItems: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#3e3e3e',
    backgroundColor: '#222222'
  },

  'IndividualGroupGames.empty': {
    alignItems: 'center',
    backgroundColor: '#222222',
    paddingVertical: 10
  },

  'IndividualGroupGames.empty.text': {
    color: 'white',
    fontSize: 18
  },

  'IndividualGroupGames.section_header': {
    alignItems: 'center',
    backgroundColor: '#3e3e3e'
  },

  'ListItem.containerStyle': {
    backgroundColor: '#222222',
    borderTopWidth: 1,
    borderTopColor: '#3e3e3e',
    borderBottomWidth: 1,
    borderBottomColor: '#3e3e3e'
  },

  'ListItem.titleStyle': {
    color: 'white'
  },

  'ListItem.subtitleStyle': {
    color: 'lightgray'
  },

  'ScrollView': {
    backgroundColor: '#171717'
  },

  'BottomTab': {
    backgroundColor: '#222222',
    height: 55
  },

  'Header': {
    backgroundColor: '#222222'
  },

  'HeaderTitle': {
    color: 'white',
    fontSize: 22
  },

  'HeaderIcon': {
    color: 'white',
    marginRight: 20,
    marginLeft: 20
  },

  'ColorThemePickerIcon': {
    color: 'white'
  },

  'Text': {
    color: 'white',
  },

  'Overlay': {
    backgroundColor: '#222222'
  },

  'Input': {
    color: 'white'
  },

  'Picker': {
    color: 'white',
    backgroundColor: '#222222'
  },

  'TopTab': {
    backgroundColor: '#222222',
  }

}

export async function getStyles() {
  let theme;
  await (async () => SecureStore.getItemAsync('theme').then((value) => {
    theme = value;
  }))();
  if (theme == 'light') {
    return StyleSheet.create(light);
  } else {
    return StyleSheet.create(dark);
  }
}