// @flow

import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { createStorage } from './storage';
import globalReducer from './globalReducer';
import mainReducer from './mainReducer';

const rootPersistConfig = {
  key: 'root',
  storage: createStorage(),
  whitelist: ['main'],
};

const mainPersistConfig = {
  key: 'main',
  storage: createStorage(),
  whitelist: ['time', 'userPickLesson'],
};

const rootReducer = combineReducers({
  global: globalReducer,
  main: persistReducer(mainPersistConfig, mainReducer),
});

export default persistReducer(rootPersistConfig, rootReducer);
