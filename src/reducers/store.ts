import { Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { compose, configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root.reducer';
import { rootSaga } from './root.saga';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV === 'development' && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

type ExtentedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtentedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer: any =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
  devTools: composeEnhancer,
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export default store;
