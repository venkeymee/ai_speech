import {
    FETCH_USERS_LISt,
    FETCH_USERS_LISt_FAILED,
    FETCH_USERS_LISt_SUCCESS
} from './actionTypes';

import { fetchUsersListAPI } from '../../../apis/user';


export function fetchUsersList(payload) {
  return async function (dispatch, getState) {
    
    dispatch({type: FETCH_USERS_LISt}); // intiate 'fetching-users-list'

    const res = await fetchUsersListAPI();
    // console.log('fetchUsersListAPI-res: ', res);
    if (res && res.status == 200) {
      dispatch({
        type: FETCH_USERS_LISt_SUCCESS,
        payload: res && res.data
      });
    } else {
      dispatch({
        type: FETCH_USERS_LISt_FAILED,
        payload: {
          message: res && res.message
        }
      })
    }
    return res;
  }
}