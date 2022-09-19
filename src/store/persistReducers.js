import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const Reducers = reducers => {
  return persistReducer(
    {
      key: "titon",
      storage,
      whitelist: ["auth", "user"],
    },
    reducers
  );
};

export default Reducers;
