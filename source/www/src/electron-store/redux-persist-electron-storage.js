import Store from '../electron-store';

const createElectronStorage = ({electronStoreOpts} = {}) => {
  const store = new Store(electronStoreOpts || {});

  return {
    getItem: (key) => {
      return new Promise((resolve) => { // eslint-disable-line
        resolve(store.get(key))
      })
    },
    setItem: (key, item) => {
      return new Promise((resolve) => { // eslint-disable-line
        resolve(store.set(key, item))
      })
    },
    removeItem: (key) => {
      return new Promise((resolve) => { // eslint-disable-line
        resolve(store.delete(key))
      })
    },
  }
}

export default createElectronStorage;
