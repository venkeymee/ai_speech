import { LOGGED_IN, LOGGING_IN } from './actionTypes';

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
    default:
      return state;
  }
}