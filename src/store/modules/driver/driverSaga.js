import { call, put, takeEvery, all } from 'redux-saga/effects'
import { errorNotification, successNotification } from '@utils/notification'
import api from '@services/api'

import {
  getDriversRequest,
  getDriversSuccess,
  getDriversFailure,
  getDriverByIdRequest,
  getDriverByIdSuccess,
  getDriverByIdFailure,
  createDriverRequest,
  createDriverSuccess,
  createDriverFailure,
  updateDriverRequest,
  updateDriverSuccess,
  updateDriverFailure,
  deleteDriverRequest,
  deleteDriverSuccess,
  deleteDriverFailure,
  forgotPasswordDriverRequest,
  forgotPasswordDriverSuccess,
  forgotPasswordDriverFailure,
  getDriversSelectRequest,
  getDriversSelectSuccess,
  getDriversSelectFailure,
  resetDriverPasswordRequest,
  resetDriverPasswordSuccess,
  resetDriverPasswordFailure,
} from './driverSlice'

// Listar todos os registros
function* getDrivers({ payload }) {
  try {
    if (!payload.search) delete payload.search

    const response = yield call(api.get, 'manager/drivers', {
      params: payload,
    })

    yield put(getDriversSuccess(response.data.data))
  } catch (error) {
    yield put(getDriversFailure(error))
    errorNotification(error)
  }
}

// Buscar por ID
function* getDriverById({ payload }) {
  try {
    const response = yield call(api.get, `manager/driver/${payload}`)
    yield put(getDriverByIdSuccess(response.data.data))
  } catch (error) {
    yield put(getDriverByIdFailure(error))
    errorNotification(error)
  }
}

// Criar
function* createDriver({ payload }) {
  try {
    if (!payload.value_fix) delete payload.value_fix
    if (!payload.percentage) delete payload.percentage

    const response = yield call(api.post, 'manager/driver/signup', payload)
    yield put(createDriverSuccess(response.data.data))

    successNotification('Motorista criado com sucesso')
  } catch (error) {
    yield put(createDriverFailure(error))
    errorNotification(error)
  }
}

// Atualizar
function* updateDriver({ payload }) {
  try {
    const { id, data } = payload

    if (!data.value_fix) delete data.value_fix
    if (!data.percentage) delete data.percentage

    if (data.cpf) delete data.cpf

    const response = yield call(api.patch, `manager/driver/${id}`, data)
    if (response.data && response.data.data) {
      yield put(updateDriverSuccess(response.data.data))
      successNotification('Motorista atualizado com sucesso')
    }
  } catch (error) {
    yield put(updateDriverFailure(error))
    errorNotification(error)
  }
}

// Deletar
function* deleteDriver({ payload }) {
  try {
    yield call(api.delete, `manager/driver/${payload}`)
    yield put(deleteDriverSuccess(payload))
    successNotification('Motorista deletado com sucesso')
  } catch (error) {
    yield put(deleteDriverFailure(error))
    errorNotification(error)
  }
}

function* forgotPasswordDriver({ payload }) {
  try {
    yield call(api.post, '/drivers/forgot-password', payload)
    yield put(forgotPasswordDriverSuccess())
  } catch (error) {
    yield put(
      forgotPasswordDriverFailure(
        error.response?.data?.message || 'Erro ao enviar email de recuperação'
      )
    )
    errorNotification(error || 'Erro ao enviar email de recuperação')
  }
}

// Buscar opções para select
function* getDriversSelect() {
  try {
    const response = yield call(api.get, 'manager/drivers-select')
    yield put(getDriversSelectSuccess(response.data.data))
  } catch (error) {
    yield put(getDriversSelectFailure(error))
    errorNotification(error)
  }
}

// Reset de senha
function* resetDriverPassword({ payload }) {
  try {
    yield call(api.patch, `driver/reset-password/${payload}`)
    yield put(resetDriverPasswordSuccess())
  } catch (error) {
    yield put(resetDriverPasswordFailure(error))
    errorNotification(error)
  }
}

export default function* driverSagas() {
  yield all([
    takeEvery(getDriversRequest.type, getDrivers),
    takeEvery(getDriverByIdRequest.type, getDriverById),
    takeEvery(createDriverRequest.type, createDriver),
    takeEvery(updateDriverRequest.type, updateDriver),
    takeEvery(deleteDriverRequest.type, deleteDriver),
    takeEvery(forgotPasswordDriverRequest.type, forgotPasswordDriver),
    takeEvery(getDriversSelectRequest.type, getDriversSelect),
    takeEvery(resetDriverPasswordRequest.type, resetDriverPassword),
  ])
}
