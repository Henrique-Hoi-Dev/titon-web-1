import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistReducers = (reducers) =>
  persistReducer(
    {
      key: 'titon',
      storage,
      whitelist: ['auth', 'user']
    },
    reducers
  );

export default persistReducers;
