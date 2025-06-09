import { call, put, takeEvery, all } from 'redux-saga/effects'
import { errorNotification, successNotification } from '@utils/notification'
import api from '@services/api'

import {
  getCreditsRequest,
  getCreditsSuccess,
  getCreditsFailure,
  getCreditByIdRequest,
  getCreditByIdSuccess,
  getCreditByIdFailure,
  createCreditRequest,
  createCreditSuccess,
  createCreditFailure,
  updateCreditRequest,
  updateCreditSuccess,
  updateCreditFailure,
  deleteCreditRequest,
  deleteCreditSuccess,
  deleteCreditFailure,
} from './creditSlice'

// Listar todos os registros
function* getCredits({ payload }) {
  try {
    if (!payload.search) delete payload.search

    const response = yield call(api.get, 'manager/credits', {
      params: payload,
    })

    yield put(getCreditsSuccess(response.data.data))
  } catch (error) {
    yield put(getCreditsFailure(error))
    errorNotification(error)
  }
}

// Buscar por ID
function* getCreditById({ driverId }) {
  try {
    const response = yield call(api.get, `manager/credit/${driverId}`)
    yield put(getCreditByIdSuccess(response.data.data))
  } catch (error) {
    yield put(getCreditByIdFailure(error))
    errorNotification(error)
  }
}

// Criar
function* createCredit({ payload }) {
  try {
    const response = yield call(api.post, 'manager/credit', payload)
    if (response.data.data) {
      yield put(createCreditSuccess(response.data))
      successNotification('Crédito adicionado com sucesso')
    }
  } catch (error) {
    yield put(createCreditFailure(error))
    errorNotification(error)
  }
}

// Atualizar
function* updateCredit({ payload }) {
  try {
    const { id, data } = payload
    const response = yield call(api.patch, `manager/credit/${id}`, data)
    if (response.data.data) {
      yield put(updateCreditSuccess(response.data))
      successNotification('Crédito atualizado com sucesso')
    }
  } catch (error) {
    yield put(updateCreditFailure(error))
    errorNotification(error)
  }
}

// Deletar
function* deleteCredit({ payload }) {
  try {
    yield call(api.delete, `manager/credit/${payload}`)
    yield put(deleteCreditSuccess(payload))
  } catch (error) {
    yield put(deleteCreditFailure(error))
    errorNotification(error)
  }
}

export default function* creditSagas() {
  yield all([
    takeEvery(getCreditsRequest.type, getCredits),
    takeEvery(getCreditByIdRequest.type, getCreditById),
    takeEvery(createCreditRequest.type, createCredit),
    takeEvery(updateCreditRequest.type, updateCredit),
    takeEvery(deleteCreditRequest.type, deleteCredit),
  ])
}
