// 配置redux，并且加入必要的中间件
import {applyMiddleware,createStore,compose} from 'redux';
import * as Storage from 'redux-storage';

import createEngine from './async_storage';
const engine = createEngine('xxreader');

const StorageMiddleware = Storage.createMiddleware(engine);

import thunkMiddleware from 'redux-thunk';
import promiseMiddlewate from 'redux-promise';
import {createLogger} from 'redux-logger';

import reducers from '../../reducers/index';
const rootReducer = Storage.reducer(reducers);

const middlewares = [
  thunkMiddleware,
  promiseMiddlewate,
  StorageMiddleware
];

const isDebug = process.env.NODE_ENV === 'development';
if(isDebug){
  const logger = createLogger({duration:true,collapsed:true});//此处logger实际上是一个函数，默认参数需要对象{ dispatch, getState } = {}
  middlewares.push(logger);
}

function configureStore() {
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);
  const store = createStore(rootReducer,undefined,composedEnhancers);
  return store;
}

const store = configureStore();

export default store;

export const loadStore = function () {
  return Storage.createLoader(engine)(store);
};
