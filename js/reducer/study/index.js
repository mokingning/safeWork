/* eslint-disable prettier/prettier */
import types from '../../action/types';
const defaultState = {};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case types.STUDY_DATA_REFERSH:
      return {
        ...state,
        [action.StoreName]: {
          ...state[action.StoreName],
          isLoading: true,
          isLoadingMore: false,
        },
      };
    case types.STUDY_REFERSH_SUCCESS:
      return {
        ...state,
        [action.StoreName]: {
          ...state[action.StoreName],
          isLoading: false,
          isLoadingMore: false,
          datas: action.data.records,
          page: action.data.current,
          total: action.data.pages,
        },
      };
    case types.STUDY_REFRESH_FAIL:
      return {
        ...state,
        [action.StoreName]: {...state[action.StoreName], isLoadingMore: false},
      };
    case types.STUDY_LOAD_MORE:
      return {
        ...state,
        [action.StoreName]: {...state[action.StoreName], isLoadingMore: true},
      };
    case types.STUDY_REFRESH_FAIL:
      return {
        ...state,
        [action.StoreName]: {
          ...state[action.StoreName],
          isLoading: false,
          isLoadingMore: false,
        },
      };
    case types.STUDY_LOAD_MORE_SUCCESS:
      return {
        ...state,
        [action.StoreName]: {
          ...state[action.StoreName],
          isLoading: false,
          isLoadingMore: false,
          datas: action.data,
          page: action.data.current,
        },
      };
    default:
      return state;
  }
}
