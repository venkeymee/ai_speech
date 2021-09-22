import { loginReducer } from '../containers/Login/reducer';
import { combineReducers } from 'redux';

export default (history) => combineReducers({
    userInfo: loginReducer,
    history: history,
});

// export default {
//     userInfo: loginReducer
// }