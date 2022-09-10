import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import {
  salesFailure,
  findAllSalesSuccess,
  getByIdSalesSuccess, 
  resetFormulario } from './actions';
import { getCardSuccess } from '../financialBox/actions';

export function* createSales({ payload }) {
  try {
    const { 
      financial_id,
      name_product, 
      price_product, 
      product_quantity, 
      discount, 
      status } = payload.values
      
    const { product_id } = payload

    const sales = { 
      financial_id,
      product_id, 
      name_product, 
      price_product, 
      product_quantity, 
      discount, 
      status 
     } 

    const res = yield call(api.post, '/sales', sales);
    if (res.data.httpStatus === 404) {
      toast.info('Não há produto em estoque.');
    }

    const response = yield call(api.get, `/saleses/${res.data.seller_id}`);
    yield put(findAllSalesSuccess(response.data));
    yield put(resetFormulario());

    toast.success('Pedido de venda realizada com sucesso!');

  } catch (err) {
    toast.error('Error na venda!');
    yield put(resetFormulario());
    yield put(salesFailure());
  }
}

export function* findAllSales({ payload }) {
  try {
    const response = yield call(api.get, `/saleses/${payload.id}`);

    yield put(findAllSalesSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar vendas.');
    yield put(salesFailure());
  }
}

export function* getByIdSales({ payload }) {
  try {
    const response = yield call(api.get, `/sales/${payload.id}`);

    yield put(getByIdSalesSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar venda.');
    yield put(salesFailure());
  }
}

export function* UpdateSales({ payload }) {
  try {
    const res = yield call(api.post, `/sales/${payload.id}`, payload.values);
    
    if (res.data.httpStatus === 404) {
      toast.info('Não há produto!');
    }
    
    const response = yield call(api.get, `/saleses/${res.data.responseData.seller_id}`);
    const responseCard = yield call(api.get, '/card');

    yield put(getCardSuccess(responseCard.data));
    yield put(findAllSalesSuccess(response.data));

    if (res.data.responseData.status === 'open') {
      toast.success('Venda editada!', {autoClose: 10000 });
      toast.info('Venda em aberto!', {autoClose: 10000 });
    }

    if (res.data.responseData.status === 'closed') {
      toast.success('Venda editada!', {autoClose: 10000 });
      toast.info('Venda foi fechada!', {autoClose: 10000 });
    }

    if (res.data.responseData.status === 'sold') {
      toast.success('Venda realizada com sucesso!');
    }
  } catch (err) {
    toast.error('Error no editar venda.');
    yield put(salesFailure());
  }
}

export function* deleteSales({ payload }) {
  try {
    const res = yield call(api.delete, `/sales/${payload.id}`);

    const response = yield call(api.get, `/saleses/${res.data.responseData}`);
    const responseCard = yield call(api.get, '/card');

    yield put(getCardSuccess(responseCard.data));
    yield put(findAllSalesSuccess(response.data));

    toast.success('Venda excluida!');
  } catch (err) {
    toast.error('Erro em excluir venda');
    yield put(salesFailure());
  }
}

export default all([
  takeLatest('@sales/CREATE_SALES_REQUEST', createSales),
  takeLatest('@sales/FINDALL_SALES_REQUEST', findAllSales),
  takeLatest('@sales/GET_BYID_SALES_REQUEST', getByIdSales),
  takeLatest('@sales/UPDATE_SALES_REQUEST', UpdateSales),
  takeLatest('@sales/DELETE_SALES_REQUEST', deleteSales),
]);
