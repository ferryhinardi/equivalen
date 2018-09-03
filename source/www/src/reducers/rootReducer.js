// @flow

import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import global from './global';
import { createStorage } from './storage';

const rootPersistConfig = {
  key: 'root',
  storage: createStorage(),
  whitelist: ['global'],
};

const globalPersistConfig = {
  key: 'global',
  storage: createStorage(),
};

const rootReducer = combineReducers({
  global: persistReducer(globalPersistConfig, global),
});

export default persistReducer(rootPersistConfig, rootReducer);
