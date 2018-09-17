import { getItem, storeItem, removeItemValue, removeAllItem } from './asyncStorage';
import isElectron from 'is-electron-renderer';

export const setStore = (key, value) => {
  if (isElectron) {
    require('electron').ipcRenderer.send('set-store-data', { key, value });
    return Promise.resolve();
  }

  return storeItem(key, value);
};

export const getStore = (key) => {
  if (isElectron) {
    const returnValue = require('electron').ipcRenderer.sendSync('get-store-data', { key });
    return Promise.resolve(returnValue);
  }

  return getItem(key);
};

export const removeStore = (key) => {
  if (isElectron) {
    const returnValue = require('electron').ipcRenderer.sendSync('remove-store-data', { key });
    return Promise.resolve(returnValue);
  }

  return removeItemValue(key);
};

export const removeAllStore = () => {
  if (isElectron) {
    const returnValue = require('electron').ipcRenderer.sendSync('remove-all-store-data');
    return Promise.resolve(returnValue);
  }

  return removeAllItem();
}
