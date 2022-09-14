import React, { Suspense } from "react";
import "./i18n/i18n";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { AdapterDateFns as AdapterDate } from '@mui/x-date-pickers/AdapterDateFns';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { initialState, reducer } from "context/reducer";
import { StateProvider } from "context/state";
import { PersistGate } from "redux-persist/es/integration/react";
import { LocalizationProvider as DateProvider } from "@mui/x-date-pickers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { persistor } from "./store/store";
import Toast from "components/atoms/toast/toast";
import history from "services/history";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter history={history}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateProvider dateAdapter={AdapterDate}>
                  <Toast />
                  <Routes>
                    <Route path="/*" element={<App />} />
                  </Routes>
                </DateProvider>
                </LocalizationProvider>
            </BrowserRouter>
          </Suspense>
        </StateProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

