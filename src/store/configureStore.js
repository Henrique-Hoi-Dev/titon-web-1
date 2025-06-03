// store/configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import persistReducers from './persistReducers';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSagas';

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducers(rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
      immutableCheck: false // <-- Desativa esse middleware em dev
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };
