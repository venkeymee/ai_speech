import { login } from '../../apis/login';
import { LOGGING_IN, LOGGED_IN } from './actionTypes';


export function loginAction(payload) {
  // dispatch({ type: LOGGING_IN });

  return async function (dispatch, getState) {
    payload = {
      ...payload,
      role: (payload.emailId == 'user') ? 'user' : 'admin'
    };
    console.log('>>>payload: ', payload);
    dispatch({
      type: LOGGED_IN,
      payload
    });
    // const res = await loginAPI(payload);
    // if (res && res.statusCode == 200) {
    //   dispatch({
    //     type: LOGGED_IN,
    //     payload: { ...res }
    //   });
    // }
  }
}