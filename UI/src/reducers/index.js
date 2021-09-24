import { loginReducer } from '../containers/Login/redux/reducer';
import { combineReducers } from 'redux';

export default (history) => combineReducers({
    userInfo: loginReducer,
    history: history,
});

// export default {
//     userInfo: loginReducer
// }