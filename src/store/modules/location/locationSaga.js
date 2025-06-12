import { call, put, takeEvery, all } from 'redux-saga/effects';
import { errorNotification } from '@utils/notification';
import api from '@services/api';

import {
  getLocationCityRequest,
  getLocationCitySuccess,
  getLocationCityFailure,
  getLocationStateRequest,
  getLocationStateSuccess,
  getLocationStateFailure,
} from './locationSlice';

// Listar todos os registros
function* getLocationCity({ payload }) {
  try {
    if (!payload.search) delete payload.search;

    const response = yield call(api.get, 'manager/cities', {
      params: payload,
    });

    yield put(getLocationCitySuccess(response.data.data));
  } catch (error) {
    yield put(getLocationCityFailure(error));
    errorNotification(error);
  }
}

// Buscar por ID
function* getLocationState({ payload }) {
  try {
    const response = yield call(api.get, `manager/states`, {
      params: payload,
    });
    yield put(getLocationStateSuccess(response.data.data));
  } catch (error) {
    yield put(getLocationStateFailure(error));
    errorNotification(error);
  }
}

export default function* locationSagas() {
  yield all([
    takeEvery(getLocationCityRequest.type, getLocationCity),
    takeEvery(getLocationStateRequest.type, getLocationState),
  ]);
}
