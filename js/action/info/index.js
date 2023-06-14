/* eslint-disable prettier/prettier */
import LoginDao from '../../expand/dao/loginDao';
import ExamDao from '../../expand/dao/ExamDao';
import types from '../types';
export function loadInfo(phoneNum) {
  return dispatch => {
    LoginDao.getInstance()
      .getInfo(phoneNum)
      .then(data => {
        dispatch({type: types.INFO_INIT, data: data});
      })
      .catch(error => {
        console.log(error);
      });
  };
}
export function initToken(token) {
  return {type: types.TOKEN_INIT, token: token, init: true};
}

export function getEmptyExam(userId) {
  return dispatch => {
    ExamDao.getInstance()
      .getEmptyExam(userId)
      .then(res => {
        dispatch({type: types.EXAM_EMPTY_SIZE, size: res});
      })
      .catch(error => {
        console.log(error);
      });
  };
}
