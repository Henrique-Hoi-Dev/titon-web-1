import { call, put, takeEvery, all } from 'redux-saga/effects';
import { errorNotification, successNotification } from '@utils/notification';
import api from '@services/api';

import {
  getTrucksRequest,
  getTrucksSuccess,
  getTrucksFailure,
  getTruckByIdRequest,
  getTruckByIdSuccess,
  getTruckByIdFailure,
  createTruckRequest,
  createTruckSuccess,
  createTruckFailure,
  updateTruckRequest,
  updateTruckSuccess,
  updateTruckFailure,
  deleteTruckRequest,
  deleteTruckSuccess,
  deleteTruckFailure,
  getTrucksSelectRequest,
  getTrucksSelectSuccess,
  getTrucksSelectFailure,
  getTruckAvatarRequest,
  getTruckAvatarFailure
} from './truckSlice';

// Listar todos os registros
function* getTrucks({ payload }) {
  try {
    if (!payload.search) delete payload.search;

    const response = yield call(api.get, 'manager/trucks', {
      params: payload
    });

    yield put(getTrucksSuccess(response.data.data));
  } catch (error) {
    yield put(getTrucksFailure(error));
    errorNotification(error);
  }
}

// Buscar por ID
function* getTruckById({ payload }) {
  try {
    const response = yield call(api.get, `manager/truck/${payload}`);
    yield put(getTruckByIdSuccess(response.data.data));
  } catch (error) {
    yield put(getTruckByIdFailure(error));
    errorNotification(error);
  }
}

// Criar
function* createTruck({ payload }) {
  try {
    const { onSuccess, ...data } = payload;
    const response = yield call(api.post, 'manager/truck', data);

    yield put(createTruckSuccess(response.data.data));

    if (onSuccess && typeof onSuccess === 'function') {
      yield call(onSuccess, response.data.data.id);
      successNotification('Caminhão criado com sucesso');
    }
  } catch (error) {
    yield put(createTruckFailure(error));
    errorNotification(error);
  }
}

// Atualizar
function* updateTruck({ payload }) {
  try {
    const { id, data } = payload;
    const response = yield call(api.patch, `manager/truck/${id}`, data);
    yield put(updateTruckSuccess(response.data.data));
    successNotification('Caminhão atualizado com sucesso');
  } catch (error) {
    yield put(updateTruckFailure(error));
    errorNotification(error);
  }
}

// Deletar
function* deleteTruck({ payload }) {
  try {
    yield call(api.delete, `manager/truck/${payload}`);
    yield put(deleteTruckSuccess(payload));
    successNotification('Caminhão deletado com sucesso');
  } catch (error) {
    yield put(deleteTruckFailure(error));
    errorNotification(error);
  }
}

// Buscar opções para select
function* getTrucksSelect() {
  try {
    const response = yield call(api.get, 'manager/trucks-select');
    yield put(getTrucksSelectSuccess(response.data.data));
  } catch (error) {
    yield put(getTrucksSelectFailure(error));
    errorNotification(error);
  }
}

// Buscar avatar
function* getTruckAvatar({ id }) {
  try {
    const response = yield call(api.get, `manager/truck/${id}/avatar`);
    return response.data.data;
  } catch (error) {
    yield put(getTruckAvatarFailure(error));
    errorNotification(error);
  }
}

export default function* truckSagas() {
  yield all([
    takeEvery(getTrucksRequest.type, getTrucks),
    takeEvery(getTruckByIdRequest.type, getTruckById),
    takeEvery(getTruckAvatarRequest.type, getTruckAvatar),
    takeEvery(createTruckRequest.type, createTruck),
    takeEvery(updateTruckRequest.type, updateTruck),
    takeEvery(deleteTruckRequest.type, deleteTruck),
    takeEvery(getTrucksSelectRequest.type, getTrucksSelect)
  ]);
}
