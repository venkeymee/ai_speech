import {
  FETCH_All_FILES,
  FETCH_All_FILES_FAILED,
  FETCH_All_FILES_SUCCESS
} from './actionTypes';
const intialState = {
  allFilesList: []
};
export const AudioAndTextFileModuleReducer = (state = intialState, action) => {
  // console.log('>>userManagement-actoin.payload', action);
  switch (action.type) {
    case FETCH_All_FILES_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_All_FILES_FAILED:
      return state;
    default:
      return state;
  }
}
