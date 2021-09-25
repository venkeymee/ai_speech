import { loginReducer } from '../containers/Login/redux/reducer';
import { AudioAndTextFileModuleReducer } from '../containers/AudioAndTextFileManagement/redux/reducer';
import { combineReducers } from 'redux';

export default (history) => combineReducers({
    userInfo: loginReducer,
    AudioAndTextFileModule: AudioAndTextFileModuleReducer,
    history: history,
});

// export default {
//     userInfo: loginReducer
// }