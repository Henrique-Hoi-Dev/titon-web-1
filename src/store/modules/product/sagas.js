import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import {
  productFailure,
  findAllProductSuccess,
  getByIdProductSuccess,
  resetFormularioProduct
} from './actions';

export function* createProduct({ payload }) {
  try {
    yield call(api.post, '/product', payload.data.values);

    toast.success('Produto registrato com sucesso!');
    yield put(resetFormularioProduct());

    const query = {
      limit: 3,
      page: 1,
      sort_field: "name",
      sort_order: "ASC",
    };

    const response = yield call(api.get, `/products`, { params: query});

    yield put(findAllProductSuccess(response.data));
  } catch (err) {
    yield put(productFailure());
    toast.error('Erro em registrar produto.');
  }
}

export function* findAllProduct({ payload }) {
  try {
    const response = yield call(api.get, `/products`, { params: payload?.data });

    yield put(findAllProductSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar todos os produtos.');
    yield put(productFailure());
  }
}

export function* getByIdProduct({ payload }) {
  try {
    const response = yield call(api.get, `/product/${payload.id}`);

    yield put(getByIdProductSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar produto!');
    yield put(productFailure());
  }
}

export function* UpdateProduct({ payload }) {
  try {
    const query = {
      limit: 3,
      page: 1,
      sort_field: "name",
      sort_order: "ASC",
    };

    yield call(api.put, `/product/${payload.data.product_id}`, payload.data.values);

    const response = yield call(api.get, `/products`, { params: query });

    yield put(findAllProductSuccess(response.data));
    yield put(resetFormularioProduct());
    
    toast.success('Editado com sucesso!');
  } catch (err) {
    toast.error('Error em editar produto.');
    yield put(productFailure());
  }
}

export function* deleteProduct({ payload }) {
  try {
    const query = {
      limit: 3,
      page: 1,
      sort_field: "name",
      sort_order: "ASC",
    };

    yield call(api.delete, `/product/${payload.data}`);

    const response = yield call(api.get, `/products`, { params: query });

    yield put(findAllProductSuccess(response.data));

    toast.success('Produto excluído');
  } catch (err) {
    toast.error('Erro em excluir produto');
    yield put(productFailure());
  }
}

export default all([
  takeLatest('@product/CREATE_PRODUCT_REQUEST', createProduct),
  takeLatest('@product/FINDALL_PRODUCT_REQUEST', findAllProduct),
  takeLatest('@product/GET_BYID_PRODUCT_REQUEST', getByIdProduct),
  takeLatest('@product/UPDATE_PRODUCT_REQUEST', UpdateProduct),
  takeLatest('@product/DELETE_PRODUCT_REQUEST', deleteProduct),
]);
