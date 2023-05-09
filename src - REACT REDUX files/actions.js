    // 25 + 5 Project //
// © Created by Caviar9045 //

export const SET_TIME = 'SET_TIME';
export const STATUS_TIMER = 'STATUS_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const ADD_TIME = 'ADD_TIME';
export const SUB_TIME = 'SUB_TIME';
export const ADD_BREAK_TIME = 'ADD_BREAK_TIME';
export const SUB_BREAK_TIME = 'SUB_BREAK_TIME';

export const setTime = (time) => {
  return {
    type: SET_TIME,
    payload: time
  };
};

export const statusTimer = (status) => {
  return {
    type: STATUS_TIMER,
    payload: status
  };
};

export const addTime = () => {
  return{
    type: ADD_TIME
  };
};

export const subTime = () => {
  return{
    type: SUB_TIME
  };
};

export const addBreakTime = () => {
  return{
    type: ADD_BREAK_TIME
  };
};

export const subBreakTime = () => {
  return{
    type: SUB_BREAK_TIME
  };
};