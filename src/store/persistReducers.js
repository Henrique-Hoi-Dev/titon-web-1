import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const Reducers = reducers => {
  return persistReducer(
    {
      key: "ngt-rgs",
      storage,
      whitelist: ["auth", "user"],
    },
    reducers
  );
};

export default Reducers;
