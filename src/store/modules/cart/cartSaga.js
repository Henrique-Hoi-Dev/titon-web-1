import { call, put, takeEvery, all } from 'redux-saga/effects';
import { errorNotification, successNotification } from '@utils/notification';
import api from '@services/api';

import {
  getCartsRequest,
  getCartsSuccess,
  getCartsFailure,
  getCartByIdRequest,
  getCartByIdSuccess,
  getCartByIdFailure,
  createCartRequest,
  createCartFailure,
  updateCartRequest,
  updateCartSuccess,
  updateCartFailure,
  deleteCartRequest,
  deleteCartSuccess,
  deleteCartFailure,
  getCartsSelectRequest,
  getCartsSelectSuccess,
  getCartsSelectFailure,
  createCartSuccess
} from './cartSlice';

// Listar todos os registros
function* getCarts({ payload }) {
  try {
    if (!payload.search) delete payload.search;

    const response = yield call(api.get, 'manager/carts', {
      params: payload
    });

    yield put(getCartsSuccess(response.data.data));
  } catch (error) {
    yield put(getCartsFailure(error));
    errorNotification(error);
  }
}

// Buscar por ID
function* getCartById({ payload }) {
  try {
    const response = yield call(api.get, `manager/cart/${payload}`);
    yield put(getCartByIdSuccess(response.data.data));
  } catch (error) {
    yield put(getCartByIdFailure(error));
    errorNotification(error);
  }
}

// Criar
function* createCart({ payload }) {
  try {
    const { onSuccess, ...data } = payload;
    const response = yield call(api.post, 'manager/cart', data);

    yield put(createCartSuccess(response.data.data));

    if (onSuccess && typeof onSuccess === 'function') {
      yield call(onSuccess, response.data.data.id);
      successNotification('Carreta criado com sucesso');
    }
  } catch (error) {
    yield put(createCartFailure(error));
    errorNotification(error);
  }
}

// Atualizar
function* updateCart({ payload }) {
  try {
    const { id, data } = payload;
    const response = yield call(api.patch, `manager/cart/${id}`, data);
    yield put(updateCartSuccess(response.data.data));
    successNotification('Carreta atualizado com sucesso');
  } catch (error) {
    yield put(updateCartFailure(error));
    errorNotification(error);
  }
}

// Deletar
function* deleteCart({ payload }) {
  try {
    yield call(api.delete, `manager/cart/${payload}`);
    yield put(deleteCartSuccess(payload));
    successNotification('Carreta deletado com sucesso');
  } catch (error) {
    yield put(deleteCartFailure(error));
    errorNotification(error);
  }
}

// Buscar opções para select
function* getCartsSelect() {
  try {
    const response = yield call(api.get, 'manager/carts-select');
    yield put(getCartsSelectSuccess(response.data.data));
  } catch (error) {
    yield put(getCartsSelectFailure(error));
    errorNotification(error);
  }
}

export default function* cartSagas() {
  yield all([
    takeEvery(getCartsRequest.type, getCarts),
    takeEvery(getCartByIdRequest.type, getCartById),
    takeEvery(createCartRequest.type, createCart),
    takeEvery(updateCartRequest.type, updateCart),
    takeEvery(deleteCartRequest.type, deleteCart),
    takeEvery(getCartsSelectRequest.type, getCartsSelect)
  ]);
}
