import {getItem, storeItem} from './asyncStorage';
import isElectron from 'is-electron-renderer';

export const setStore = (key, value) => {
  if (isElectron) {
    require('electron').ipcRenderer.send('set-store-data', {key, value});
    return Promise.resolve();
  }

  return storeItem(key, value);
};

export const getStore = (key) => {
  if (isElectron) {
    const returnValue = require('electron').ipcRenderer.sendSync('get-store-data', {key});
    return Promise.resolve(returnValue);
  }

  return getItem(key);
};
