// @flow

import isElectronRenderer from 'is-electron-renderer';

export const createStorage = () =>
  isElectronRenderer ?
    require('../electron-store/redux-persist-electron-storage').default() :
    require('redux-persist/lib/storage').default;
