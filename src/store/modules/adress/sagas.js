import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { adressFailure, getByIdAdressSuccess } from './actions';

export function* createAdress({ payload }) {
  try {
    yield call(api.post, `/adress/${payload.id}`, payload?.values);

    toast.success('Endereço salvo com sucesso!');
    history.push(`/perfil/${payload?.id}`);
  } catch (err) {
    yield put(adressFailure());
    toast.error('Error em salvar endereço.');
  }
}

export function* getByIdAdress({ payload }) {
  try {
    const response = yield call(api.get, `/adress/${payload.id}`);

    yield put(getByIdAdressSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar endereço.');
    yield put(adressFailure());
  }
}

export function* updateAdress({ payload }) {
  try {
    const { 
      cep, 
      logradouro, 
      complemento, 
      numero, 
      bairro, 
      cidade, 
      uf } = payload.data;

    const adresses = { cep, logradouro, complemento, numero, bairro, cidade, uf };

    const response = yield call(api.put, `/adress/${payload.id}`, adresses);

    toast.success('Endereço atualizado com sucesso!');
    history.push(`/perfil/${payload.id}`);
    yield put(getByIdAdressSuccess(response.data));
  } catch (err) {
    toast.error('Error em atualizado endereço.');
    yield put(adressFailure());
  }
}

export default all([
  takeLatest('@adress/CREATE_ADRESS_REQUEST', createAdress),
  takeLatest('@adress/GET_BYID_ADRESS_REQUEST', getByIdAdress),
  takeLatest('@adress/UPDATE_ADRESS_REQUEST', updateAdress),
]);
