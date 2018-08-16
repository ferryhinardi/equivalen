// @flow

import {AsyncStorage} from 'react-native';

export const getStore = async (key: string) => {
  try {
    let item;
    const retrievedItem =  await AsyncStorage.getItem(key);
    if (typeof retrievedItem === 'string') {
      item = retrievedItem;
    } else {
      item = JSON.parse(retrievedItem);
    }
    return item;
  } catch (error) {
    console.log(error.message);
  }

  return;
};

export const storeItem = async(key: string, item: any) => {
  try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      let jsonOfItem;
      if (typeof item === 'string') {
        jsonOfItem = await AsyncStorage.setItem(key, item);
      } else {
        jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      }
      return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }

  return;
};
