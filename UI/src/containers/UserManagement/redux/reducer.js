import {
  FETCH_USERS_LISt,
  FETCH_USERS_LISt_FAILED,
  FETCH_USERS_LISt_SUCCESS
} from './actionTypes';
const intialState = {
  userList: []
};
export const userModule = (state = intialState, action) => {
  console.log('>>userManagement-actoin.payload', action);
  switch (action.type) {
    case FETCH_USERS_LISt_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_USERS_LISt_FAILED:
      return state;
    default:
      return state;
  }
}
