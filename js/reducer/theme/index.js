/* eslint-disable prettier/prettier */
import Types from '../../action/types';

//定义state默认值，注意这里的数据结构取值的时候要保持一致
const defaultState = {
  theme: 'white',
};
/**
 * action处理函数，处理action返回state
 */
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
}
