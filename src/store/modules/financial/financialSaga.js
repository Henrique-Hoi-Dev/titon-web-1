import { call, put, takeEvery, all } from 'redux-saga/effects';
import api from '@services/api';
import { errorNotification } from '@utils/notification';

import {
  getFinancialsRequest,
  getFinancialsSuccess,
  getFinancialsFailure,
  getFinancialByIdRequest,
  getFinancialByIdSuccess,
  getFinancialByIdFailure,
  createFinancialRequest,
  createFinancialSuccess,
  createFinancialFailure,
  updateFinancialRequest,
  updateFinancialSuccess,
  updateFinancialFailure,
  finishingFinancialRequest,
  finishingFinancialSuccess,
  finishingFinancialFailure,
  deleteFinancialRequest,
  deleteFinancialSuccess,
  deleteFinancialFailure
} from './financialSlice';

// Listar todos os registros
function* getFinancials({ payload }) {
  try {
    if (!payload.search) delete payload.search;
    if (!payload.status_check) delete payload.status_check;
    if (!payload.sort_order) delete payload.sort_order;

    const response = yield call(api.get, 'manager/financialStatements', {
      params: payload
    });

    yield put(getFinancialsSuccess(response.data.data));
  } catch (error) {
    yield put(getFinancialsFailure(error));
    errorNotification(error);
  }
}

// Buscar por ID
function* getFinancialById({ payload }) {
  try {
    const response = yield call(
      api.get,
      `manager/financialStatement/${payload}`
    );
    yield put(getFinancialByIdSuccess(response.data));
  } catch (error) {
    yield put(getFinancialByIdFailure(error));
    errorNotification(error);
  }
}

// Criar
function* createFinancial({ payload }) {
  try {
    const response = yield call(
      api.post,
      'manager/financialStatement',
      payload
    );
    yield put(createFinancialSuccess(response.data));
  } catch (error) {
    yield put(createFinancialFailure(error));
    errorNotification(error);
  }
}

// Atualizar
function* updateFinancial({ payload }) {
  try {
    const { id, data } = payload;
    const response = yield call(
      api.patch,
      `manager/financialStatement/${id}`,
      data
    );
    yield put(updateFinancialSuccess(response.data));
  } catch (error) {
    yield put(updateFinancialFailure(error));
    errorNotification(error);
  }
}

// Finalizar
function* finishingFinancial({ payload }) {
  try {
    const { id, data } = payload;
    const response = yield call(
      api.patch,
      `manager/financialStatement/finishing/${id}`,
      data
    );
    yield put(finishingFinancialSuccess(response.data));
  } catch (error) {
    yield put(finishingFinancialFailure(error));
    errorNotification(error);
  }
}

// Deletar
function* deleteFinancial({ payload }) {
  try {
    yield call(api.delete, `manager/financialStatement/${payload}`);
    yield put(deleteFinancialSuccess(payload));
  } catch (error) {
    yield put(deleteFinancialFailure(error));
    errorNotification(error);
  }
}

export default function* financialSagas() {
  yield all([
    takeEvery(getFinancialsRequest.type, getFinancials),
    takeEvery(getFinancialByIdRequest.type, getFinancialById),
    takeEvery(createFinancialRequest.type, createFinancial),
    takeEvery(updateFinancialRequest.type, updateFinancial),
    takeEvery(finishingFinancialRequest.type, finishingFinancial),
    takeEvery(deleteFinancialRequest.type, deleteFinancial)
  ]);
}
