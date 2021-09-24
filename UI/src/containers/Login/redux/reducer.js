import { LOGGED_IN, LOGGING_IN, LOGGED_IN_FAILED } from './actionTypes';

const initialState = {
  loggedIn: false,
};

export const loginReducer = (state = initialState, action) => {
  console.log('>>actoin.payload', action);
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        ...action.payload
      }
    case LOGGED_IN_FAILED:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}