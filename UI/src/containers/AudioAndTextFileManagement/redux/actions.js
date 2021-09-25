import {
  FETCH_All_FILES,
  FETCH_All_FILES_FAILED,
  FETCH_All_FILES_SUCCESS
} from './actionTypes';

import { fetchAllFilesAPI } from '../../../apis/audioAndTextFileManager';


export function fetchAllFiles(payload) {
  return async function (dispatch, getState) {
    
    dispatch({type: FETCH_All_FILES}); // intiate 'fetching-users-list'

    const res = await fetchAllFilesAPI();
    // console.log('fetchAllFilesAPI-res: ', res);
    if (res && res.status == 200) {
      dispatch({
        type: FETCH_All_FILES_SUCCESS,
        payload: res && res.data
      });
    } else {
      dispatch({
        type: FETCH_All_FILES_FAILED,
        payload: {
          message: res && res.message
        }
      })
    }
    return res;
  }
}