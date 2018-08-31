import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

export default function configureStore(isElectronRenderer) {
  const storage = isElectronRenderer ?
    require('./electron-store/reduxPersistElectronStorage')() :
    require('redux-persist/lib/storage');

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['global'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
  );
  const persistor = persistStore(store);

  return { store, persistor };
}
