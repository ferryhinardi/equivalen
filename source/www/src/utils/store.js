import {ipcRenderer} from 'electron';
import {getItem, storeItem} from './asyncStorage';
import isElectron from 'is-electron-renderer';

export const setStore = (key, value, callback) => {
  if (isElectron) {
    ipcRenderer.send('set-store-data', {key, value});
    callback && callback();
  } else {
    return storeItem(key, value).then(() => callback && callback());
  }
};

export const getStore = (key, callback) => {
  if (isElectron) {
    const returnValue = ipcRenderer.sendSync('get-store-data', {key});
    callback && callback(returnValue);
  } else {
    return getItem(key).then((returnValue) => callback && callback(returnValue));
  }
};
