import { createStore, applyMiddleware } from "redux";

const CreateStore = (reducers, middlewares) => {
  const enhancer = applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};

export default CreateStore;
