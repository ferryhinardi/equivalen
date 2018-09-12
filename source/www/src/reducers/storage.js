// @flow

import isElectronRenderer from 'is-electron-renderer';

export const createStorage = () =>
  isElectronRenderer ?
    require('redux-persist-electron-storage-cra').default() :
    require('redux-persist/lib/storage').default;
