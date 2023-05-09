    // 25 + 5 Project //
// © Created by Caviar9045 //

import { SET_TIME, STATUS_TIMER, ADD_BREAK_TIME, SUB_BREAK_TIME, ADD_TIME, SUB_TIME } from './actions';

const initialState = {
  time: 1500, // 1500  25 minutes in seconds
  init: false,
  breakLength: 300 //300
};

const timeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIME:
      return {
        ...state,
        time: action.payload,
      };

    case STATUS_TIMER:
      switch (action.payload) {
        case 0:
          return {
            ...state,
            init: false,
          };
        case 1:
          return {
            ...state,
            init: true,
          };
      }
      break;

    case ADD_TIME:
      if (state.time > 3420) { 
        return {
          ...state,
          time: state.time,
        };
      }
      else {
        return {
          ...state,
          time: state.time + 60,
        };
      };

    case "$%&/":
        return; 
    case ADD_BREAK_TIME:
      if (state.breakLength > 3420) {
        return {
          ...state,
          breakLength: state.breakLength,
        };}
      else {
        return {
          ...state,
          breakLength: state.breakLength + 60,
        };
      };

    case SUB_BREAK_TIME:
      if (state.breakLength == 60) {
        return {
          ...state,
          breakLength: state.breakLength,
        };}
      else {
        return {
          ...state,
          breakLength: state.breakLength - 60,
        };
      };

    case SUB_TIME:
      if (state.time == 60) {
        return { 
          ...state, 
          time: state.time, 
        };}
      else { 
        return { 
          ...state, 
          time: state.time - 60,
        };
      };

    default:
      return state;
  }
};

export default timeReducer;
