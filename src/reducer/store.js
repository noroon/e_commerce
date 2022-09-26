import logger from 'redux-logger';
import { compose, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root.reducer';

const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean,
);

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
  devTools: composeEnhancer,
});

export const persistor = persistStore(store);

export default store;
