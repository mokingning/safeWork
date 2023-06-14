/* eslint-disable prettier/prettier */
import types from '../types';
import StudyDao from '../../expand/dao/StudyDao';
import keys from '../../common/keys.json';
import store from '../../store';
import {isArray} from 'lodash';
export function loadFirstData(StoreName) {
  return dispatch => {
    // console.log(getApi(StoreName));
    dispatch({type: types.STUDY_DATA_REFERSH, StoreName: StoreName});
    let studyDao = StudyDao.getInstance();
    studyDao
      .refreshData(getApi(StoreName))
      .then(res => {
        dispatch({
          type: types.STUDY_REFERSH_SUCCESS,
          StoreName,
          data: res.data,
        });
      })
      .catch(error => {
        dispatch({type: types.STUDY_REFRESH_FAIL, StoreName, error});
      });
  };
}

export function loadMore(StoreName, datas, page, callBack) {
  return dispatch => {
    dispatch({type: types.STUDY_LOAD_MORE, StoreName});
    let studyDao = StudyDao.getInstance();
    // let state = store.getState();
    studyDao
      .loadMore(getApi(StoreName), page)
      .then(res => {
        const newData = [...datas, ...res.data.records];
        dispatch({
          type: types.STUDY_LOAD_MORE_SUCCESS,
          StoreName,
          data: newData,
        });
      })
      .catch(error => {
        dispatch({type: types.STUDY_LOAD_MORE_FAIL, StoreName, error});
      });
  };
}

function getApi(StoreName) {
  var apiObject = keys.filter(function (item) {
    return item.name === StoreName;
  });
  return apiObject;
}
