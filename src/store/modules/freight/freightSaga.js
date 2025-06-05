import { call, put, takeEvery, all } from 'redux-saga/effects';
import { errorNotification, successNotification } from '@utils/notification';
import api from '@services/api';

import {
  getFreightsRequest,
  getFreightsSuccess,
  getFreightsFailure,
  getFreightByIdRequest,
  getFreightByIdSuccess,
  getFreightByIdFailure,
  createFreightRequest,
  createFreightSuccess,
  createFreightFailure,
  updateFreightRequest,
  updateFreightSuccess,
  updateFreightFailure,
  deleteFreightRequest,
  deleteFreightSuccess,
  deleteFreightFailure,
  getFirstCheckByIdRequest,
  getFirstCheckByIdSuccess,
  getFirstCheckByIdFailure
} from './freightSlice';

// Listar todos os registros
function* getFreights({ payload }) {
  try {
    if (!payload.search) delete payload.search;

    const response = yield call(api.get, 'manager/freights', {
      params: payload
    });

    yield put(getFreightsSuccess(response.data.data));
  } catch (error) {
    yield put(getFreightsFailure(error));
    errorNotification(error);
  }
}

// Buscar por ID
function* getFreightById({ payload }) {
  try {
    const response = yield call(api.get, `manager/freight/${payload}`);
    yield put(getFreightByIdSuccess(response.data.data));
  } catch (error) {
    yield put(getFreightByIdFailure(error));
    errorNotification(error);
  }
}

// Buscar por ID
function* getFirstCheckById({ payload }) {
  try {
    const response = yield call(api.get, `manager/first-check/${payload}`);
    yield put(getFirstCheckByIdSuccess(response.data.data));
  } catch (error) {
    yield put(getFirstCheckByIdFailure(error));
    errorNotification(error);
  }
}

// Criar
function* createFreight({ payload }) {
  try {
    const response = yield call(api.post, 'manager/freight', payload);
    yield put(createFreightSuccess(response.data.data));
    successNotification('Frete criado com sucesso');
  } catch (error) {
    yield put(createFreightFailure(error));
    errorNotification(error);
  }
}

// Atualizar
function* updateFreight({ payload }) {
  try {
    const { id, data } = payload;
    const response = yield call(api.patch, `manager/freight/${id}`, data);
    yield put(updateFreightSuccess(response.data));
    successNotification('Frete atualizado com sucesso');
  } catch (error) {
    yield put(updateFreightFailure(error));
    errorNotification(error);
  }
}

// Deletar
function* deleteFreight({ payload }) {
  try {
    yield call(api.delete, `manager/freight/${payload}`);
    yield put(deleteFreightSuccess(payload));
    successNotification('Frete deletado com sucesso');
  } catch (error) {
    yield put(deleteFreightFailure(error));
    errorNotification(error);
  }
}

export default function* freightSagas() {
  yield all([
    takeEvery(getFreightsRequest.type, getFreights),
    takeEvery(getFirstCheckByIdRequest.type, getFirstCheckById),
    takeEvery(getFreightByIdRequest.type, getFreightById),
    takeEvery(createFreightRequest.type, createFreight),
    takeEvery(updateFreightRequest.type, updateFreight),
    takeEvery(deleteFreightRequest.type, deleteFreight)
  ]);
}
