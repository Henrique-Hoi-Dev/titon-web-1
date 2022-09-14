import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";

import persistReducer from "./persistReducers";
import createStore from "./createStore";
import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(persistReducer(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
