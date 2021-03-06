import { loginAPI } from '../../../apis/user';
import { LOGGING_IN, LOGGED_IN, LOGGED_IN_FAILED } from './actionTypes';
import { setUserData } from '../../../utils/index';

export function loginAction(payload) {
  return async function (dispatch, getState) {
    const res = await loginAPI(payload);
    // console.log('login-res: ', res);
    if (res && res.status == 200) {
      setUserData(res.data || {}); // store the data for later usage
      dispatch({
        type: LOGGED_IN,
        payload: res && res.data
      });
    } else {
      dispatch({
        type: LOGGED_IN_FAILED,
        payload: {
          message: res && res.message
        }
      })
    }
    return res;
  }
}