import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider as DateProvider } from '@mui/x-date-pickers';
import { AdapterDateFns as AdapterDate } from '@mui/x-date-pickers/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import './index.css';
import './i18n/i18n';
import { store, persistor } from './store/configureStore';
import { loadGoogleFonts, safeAccessStyleSheets } from './utils/fontLoader';
import { initialState, reducer } from 'context/reducer';
import { StateProvider } from 'context/state';
import Toast from 'components/atoms/toast/toast';
import App from './App';

safeAccessStyleSheets();
loadGoogleFonts();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter
              future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
            >
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
  document.getElementById('root')
);
