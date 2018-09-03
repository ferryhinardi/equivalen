// @flow

import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { createStorage } from './storage';
import global from './global';
import main from './main';

const rootPersistConfig = {
  key: 'root',
  storage: createStorage(),
  whitelist: ['global'],
};

const mainPersistConfig = {
  key: 'main',
  storage: createStorage(),
};

const rootReducer = combineReducers({
  global,
  main: persistReducer(mainPersistConfig, main),
});

export default persistReducer(rootPersistConfig, rootReducer);
