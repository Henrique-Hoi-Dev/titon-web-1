import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import { apiAuth } from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
 const { email, pw } =  payload
  try {
    const response = yield call(apiAuth.post, 'user/authenticate', {}, {
      headers: {
      "email": email,
      "password": pw
     }}
    )

    const { access_token, rooms } = response.data;

    apiAuth.defaults.headers.Authorization = `Bearer ${access_token}`;

    yield put(signInSuccess(access_token, rooms));
  } catch (err) {
    toast.error('Falha na autenticação verifique seus dados');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { access_token } = payload.auth;

  if (access_token) {
    apiAuth.defaults.headers = `Bearer ${access_token} `;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
