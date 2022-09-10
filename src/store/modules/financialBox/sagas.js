import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import {
  getByIdFinancialBoxSuccess,
  findAllFinancialBoxSuccess,
  findAllOpenSuccess,
  getCardSuccess, 
  financialBoxFailure
} from './actions';

export function* createFinancialBox({ payload }) {
  try {
    const { open_caixa, value_open } = payload.values
    const financialBox = { open_caixa, value_open }

    yield call(api.post, `/financialBox/${payload.id}`, financialBox);

    const responseList = yield call(api.get, `/financialBoxsOpen/${payload.id}`);

    yield put(findAllOpenSuccess(responseList.data));

    toast.success('Caixa aberto com sucesso!');
  } catch (err) {
    toast.error('Error ao abrir um novo caixa.');
    yield put(financialBoxFailure());
  }
}

export function* getByIdFinancialBox({ payload }) {
  try {
    const response = yield call(api.get, `/financialBox/${payload.id}`);

    yield put(getByIdFinancialBoxSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar caixa.');
    yield put(financialBoxFailure());
  }
}

export function* getByCard() {
  try {
    const response = yield call(api.get, '/card');

    yield put(getCardSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar cards.');
    yield put(financialBoxFailure());
  }
}

export function* findAllFinancialBox({ payload }) {
  try {
    const response = yield call(api.get, `/financialBoxs/${payload.id}`);

    yield put(findAllFinancialBoxSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar todos os caixas.');
    yield put(financialBoxFailure());
  }
}

export function* findOpen({ payload }) {
  try {
    const response = yield call(api.get, `/financialBoxsOpen/${payload.id}`);

    yield put(findAllOpenSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar todos os caixas aberto.');
    yield put(financialBoxFailure());
  }
}

export function* UpdateFinancialBox({ payload }) {
  try {
    const { close_caixa, status } = payload.data
    const fecharCaixa = { close_caixa, status }

    if (close_caixa === '') {
      toast.info('Adicione data para fechamento do caixa!');
    }

    const res = yield call(api.put, `/financialBox/${payload.id}`, fecharCaixa);

    const response = yield call(api.get, `/financialBoxsOpen/${res.data.responseData.user_id}`);
    const responseGet = yield call(api.get, `/financialBox/${payload.id}`);

    yield put(getByIdFinancialBoxSuccess(responseGet.data));
    yield put(findAllOpenSuccess(response.data));

    toast.success('Caixa fechado com sucesso!');
  } catch (err) {
    toast.error('Error no fechar caixa.');
    yield put(financialBoxFailure());
  }
}

export default all([
  takeLatest('@financialBox/CREATE_FINANCIALBOX_REQUEST', createFinancialBox),
  takeLatest('@financialBox/GET_BYID_FINANCIALBOX_REQUEST', getByIdFinancialBox),
  takeLatest('@financialBox/GET_CARD_REQUEST', getByCard),
  takeLatest('@financialBox/FIND_ALL_FINANCIALBOX_REQUEST', findAllFinancialBox),
  takeLatest('@financialBox/FIND_OPEN_REQUEST', findOpen),
  takeLatest('@financialBox/UPDATE_FINANCIALBOX_REQUEST', UpdateFinancialBox),
]);
