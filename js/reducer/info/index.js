/* eslint-disable prettier/prettier */
import types from '../../action/types';
const defaultState = {init: false};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case types.INFO_INIT:
      const {roles, phoneNum, id, avatar, username, standard, deptId} =
        action.data;
      return {
        ...state,
        roles: roles,
        phoneNum: phoneNum,
        id: id,
        avatar: avatar,
        username: username,
        standard: standard,
        init: true,
        deptId: deptId,
      };
    case types.TOKEN_INIT:
      return {...state, token: action.token, init: action.init};
    case types.EXAM_EMPTY_SIZE:
      return {
        ...state,
        size: action.size,
      };
    default:
      return state;
  }
}
