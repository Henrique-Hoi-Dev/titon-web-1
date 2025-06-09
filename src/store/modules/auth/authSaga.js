import { takeLatest, call, put, all } from 'redux-saga/effects';
import jwt from 'jwt-decode';

import api from '../../../services/api';
import history from '../../../services/history';

import { signInRequest, signInSuccess, signFailure } from './authSlice';
import { errorNotification } from '@/utils/notification';

function* signIn({ payload }) {
  try {
    const response = yield call(api.post, 'manager/signin', payload);
    const { token } = response.data.data;

    const user = jwt(token);
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess({ token, user }));
    history.push('/');
  } catch (err) {
    yield put(signFailure());
    errorNotification(err);
  }
}

// eslint-disable-next-line require-yield
function* setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default function* authSaga() {
  yield all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest(signInRequest.type, signIn)
  ]);
}
