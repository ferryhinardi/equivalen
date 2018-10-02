// @flow

import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { createStorage } from './storage';
import globalReducer from './globalReducer';
import mainReducer from './mainReducer';

const mainPersistConfig = {
  key: 'main',
  storage: createStorage(),
  whitelist: ['time', 'userLessonData', 'currentMatpel'],
  blacklist: ['startTime'],
};

const rootReducer = combineReducers({
  global: globalReducer,
  main: persistReducer(mainPersistConfig, mainReducer),
});

export default rootReducer;
