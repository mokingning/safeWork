/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import theme from './theme';
import info from './info';
import study from './study';
/**
 * 合并reducer，通过combineReducers将多个reducer合并成一个根reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({
  currentTheme: theme,
  info: info,
  study: study,
});

export default index;
