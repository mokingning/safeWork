/* eslint-disable prettier/prettier */
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';
const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispatch a function');
  } else {
    console.log('dispatich', action);
  }
  const result = next(action); //result 对应的就是nextstate
  console.log('nextState', store.getState());
  return result;
};
//设置中间件
const middlewares = [logger, thunk];

/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares));
