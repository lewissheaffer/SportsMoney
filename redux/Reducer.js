import {
  combineReducers
} from 'redux';

const INITIAL_STATE = {
  styles: {}
};

const stylesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_STYLES':
      return {
        styles: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  styles: stylesReducer
});