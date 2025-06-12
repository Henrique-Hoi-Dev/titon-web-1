import { call, put, takeEvery, all } from 'redux-saga/effects';
import { errorNotification, successNotification } from '@utils/notification';
import api from '@services/api';

import {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  getUserByIdRequest,
  getUserByIdSuccess,
  getUserByIdFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} from './userSlice';

// Listar todos os registros
function* getUsers({ payload }) {
  try {
    if (!payload.search) delete payload.search;

    const response = yield call(api.get, 'manager/users', {
      params: payload,
    });

    yield put(getUsersSuccess(response.data.data));
  } catch (error) {
    yield put(getUsersFailure(error));
    errorNotification(error);
  }
}

// Buscar por ID
function* getUserById({ payload }) {
  try {
    const response = yield call(api.get, `manager/user/${payload}`);
    yield put(getUserByIdSuccess(response.data.data));
  } catch (error) {
    yield put(getUserByIdFailure(error));
    errorNotification(error);
  }
}

// Criar
function* createUser({ payload }) {
  try {
    const response = yield call(api.post, 'manager/signup', payload);
    yield put(createUserSuccess(response.data.data));
    successNotification('Usuário criado com sucesso');
  } catch (error) {
    yield put(createUserFailure(error));
    errorNotification(error);
  }
}

// Atualizar
function* updateUser({ payload }) {
  try {
    const { id, data } = payload;
    const response = yield call(api.patch, `manager/user/${id}`, data);
    yield put(updateUserSuccess(response.data));
    successNotification('Usuário atualizado com sucesso');
  } catch (error) {
    yield put(updateUserFailure(error));
    errorNotification(error);
  }
}

// Deletar
function* deleteUser({ payload }) {
  try {
    yield call(api.delete, `manager/user/${payload}`);
    yield put(deleteUserSuccess(payload));
    successNotification('Usuário deletado com sucesso');
  } catch (error) {
    yield put(deleteUserFailure(error));
    errorNotification(error);
  }
}

export default function* userSagas() {
  yield all([
    takeEvery(getUsersRequest.type, getUsers),
    takeEvery(getUserByIdRequest.type, getUserById),
    takeEvery(createUserRequest.type, createUser),
    takeEvery(updateUserRequest.type, updateUser),
    takeEvery(deleteUserRequest.type, deleteUser),
  ]);
}
