import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { 
  serviceFailure, 
  getByIdServiceSuccess,
  findAllServiceSuccess } from './actions';

export function* createService({ payload }) {
  try {
    const employee_id = payload.id
    const { name, price, date_service, financial_id } = payload.values
    const servicos = { name, price, date_service, employee_id }

    yield call(api.post, `/service/${financial_id}`, servicos);
    toast.success('Serviço registrado com sucesso!');

    const response = yield call(api.get, `/services/${payload.id}`);
    yield put(findAllServiceSuccess(response.data));

  } catch (err) {
    toast.error('Error em registrar serviço.');
    yield put(serviceFailure());
  }
}

export function* getByIdService({ payload }) {
  try {
    const response = yield call(api.get, `/serviceFinancial/${payload.id}`);

    yield put(getByIdServiceSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar serviço.');
    yield put(serviceFailure());
  }
}

export function* findAllService({ payload }) {
  try {
    const response = yield call(api.get, `/services/${payload.id}`);

    yield put(findAllServiceSuccess(response.data));
  } catch (err) {
    toast.error('Erro em buscar todos os serviços');
    yield put(serviceFailure());
  }
}

export function* deleteService({ payload }) {
  try {
    const res = yield call(api.delete, `/service/${payload.id}`);

    const response = yield call(api.get, `/services/${res.data.responseData}`);

    yield put(findAllServiceSuccess(response.data));
    toast.success('Serviço excluído');
  } catch (err) {
    toast.error('Erro em excluir serviços');
    yield put(serviceFailure());
  }
}

export default all([
  takeLatest('@service/CREATE_SERVICE_REQUEST', createService),
  takeLatest('@service/GET_BYID_SERVICE_REQUEST', getByIdService),
  takeLatest('@service/FINDALL_SERVICE_REQUEST', findAllService),
  takeLatest('@service/DELETE_SERVICE_REQUEST', deleteService),
]);
