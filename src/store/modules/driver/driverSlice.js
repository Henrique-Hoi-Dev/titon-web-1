import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  dataGetById: null,
  selectOptions: [],
  selected: null,
  loading: false,
  loadingGet: false,
  loadingGetById: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  loadingForgotPassword: false,
  loadingSelect: false,
  loadingResetPassword: false,
  error: null,
  errorGet: null,
  errorGetById: null,
  errorCreate: null,
  errorUpdate: null,
  errorDelete: null,
  errorForgotPassword: null,
  errorSelect: null,
  errorResetPassword: null,
  successCreate: false,
  successUpdate: false,
  successDelete: false,
  successForgotPassword: false,
  successResetPassword: false,
}

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    // Buscar lista
    getDriversRequest(state) {
      state.loadingGet = true
      state.errorGet = null
    },
    getDriversSuccess(state, action) {
      state.data = action.payload
      state.loadingGet = false
      state.errorGet = null
    },
    getDriversFailure(state, action) {
      state.loadingGet = false
      state.errorGet = action.payload
    },

    // Buscar por ID
    getDriverByIdRequest(state) {
      state.loadingGetById = true
      state.errorGetById = null
    },
    getDriverByIdSuccess(state, action) {
      state.selected = action.payload
      state.loadingGetById = false
      state.errorGetById = null
    },
    getDriverByIdFailure(state, action) {
      state.loadingGetById = false
      state.errorGetById = action.payload
    },

    // Criar
    createDriverRequest(state) {
      state.loadingCreate = true
      state.errorCreate = null
      state.successCreate = false
    },
    createDriverSuccess(state, action) {
      state.loadingCreate = false
      state.successCreate = true
      state.errorCreate = null
    },
    createDriverFailure(state, action) {
      state.loadingCreate = false
      state.successCreate = false
      state.errorCreate = action.payload
    },

    // Atualizar
    updateDriverRequest(state) {
      state.loadingUpdate = true
      state.errorUpdate = null
      state.successUpdate = false
    },
    updateDriverSuccess(state) {
      state.loadingUpdate = false
      state.errorUpdate = null
      state.successUpdate = true
    },
    updateDriverFailure(state, action) {
      state.loadingUpdate = false
      state.successUpdate = false
      state.errorUpdate = action.payload
    },

    // Deletar
    deleteDriverRequest(state) {
      state.loadingDelete = true
      state.errorDelete = null
      state.successDelete = false
    },
    deleteDriverSuccess(state) {
      state.loadingDelete = false
      state.successDelete = true
      state.errorDelete = null
    },
    deleteDriverFailure(state, action) {
      state.loadingDelete = false
      state.successDelete = false
      state.errorDelete = action.payload
    },

    // Esqueci minha senha
    forgotPasswordDriverRequest(state) {
      state.loadingForgotPassword = true
      state.errorForgotPassword = null
    },
    forgotPasswordDriverSuccess(state) {
      state.loadingForgotPassword = false
      state.errorForgotPassword = null
    },
    forgotPasswordDriverFailure(state, action) {
      state.loadingForgotPassword = false
      state.errorForgotPassword = action.payload
    },

    // Buscar opções para select
    getDriversSelectRequest(state) {
      state.loadingSelect = true
      state.errorSelect = null
    },
    getDriversSelectSuccess(state, action) {
      state.selectOptions = action.payload
      state.loadingSelect = false
      state.errorSelect = null
    },
    getDriversSelectFailure(state, action) {
      state.loadingSelect = false
      state.errorSelect = action.payload
    },

    // Reset de senha
    resetDriverPasswordRequest(state) {
      state.loadingResetPassword = true
      state.errorResetPassword = null
      state.successResetPassword = false
    },
    resetDriverPasswordSuccess(state) {
      state.loadingResetPassword = false
      state.successResetPassword = true
      state.errorResetPassword = null
    },
    resetDriverPasswordFailure(state, action) {
      state.loadingResetPassword = false
      state.successResetPassword = false
      state.errorResetPassword = action.payload
    },

    resetUpdateDriverStatus(state) {
      state.successUpdate = false
      state.errorUpdate = null
      state.loadingUpdate = false
    },

    resetCreateDriverStatus(state) {
      state.successCreate = false
      state.errorCreate = null
      state.loadingCreate = false
    },

    resetDeleteDriverStatus(state) {
      state.successDelete = false
      state.errorDelete = null
      state.loadingDelete = false
    },

    resetForgotPasswordDriverStatus(state) {
      state.successForgotPassword = false
      state.errorForgotPassword = null
      state.loadingForgotPassword = false
    },

    resetResetPasswordDriverStatus(state) {
      state.successResetPassword = false
      state.errorResetPassword = null
      state.loadingResetPassword = false
    },
  },
})

export const {
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
  resetUpdateDriverStatus,
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
  resetCreateDriverStatus,
  resetDeleteDriverStatus,
  resetForgotPasswordDriverStatus,
  resetResetPasswordDriverStatus,
} = driverSlice.actions

export default driverSlice.reducer
