import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  selected: null,
  loading: false,
  error: null,
  successCreate: false,
  successUpdate: false,
  successDelete: false,
}

const creditSlice = createSlice({
  name: 'credit',
  initialState,
  reducers: {
    // Buscar lista
    getCreditsRequest(state) {
      state.loading = true
      state.error = null
    },
    getCreditsSuccess(state, action) {
      state.data = action.payload
      state.loading = false
    },
    getCreditsFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },

    // Buscar por ID
    getCreditByIdRequest(state) {
      state.loading = true
      state.error = null
    },
    getCreditByIdSuccess(state, action) {
      state.selected = action.payload
      state.loading = false
    },
    getCreditByIdFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },

    // Criar
    createCreditRequest(state) {
      state.loading = true
      state.error = null
      state.successCreate = false
    },
    createCreditSuccess(state, action) {
      state.data.push(action.payload)
      state.loading = false
      state.successCreate = true
    },
    createCreditFailure(state, action) {
      state.loading = false
      state.successCreate = false
      state.error = action.payload
    },

    // Atualizar
    updateCreditRequest(state) {
      state.loading = true
      state.error = null
      state.successUpdate = false
    },
    updateCreditSuccess(state) {
      state.loading = false
      state.successUpdate = true
      state.error = null
    },
    updateCreditFailure(state, action) {
      state.loading = false
      state.successUpdate = false
      state.error = action.payload
    },

    // Deletar
    deleteCreditRequest(state) {
      state.loading = true
      state.error = null
      state.successDelete = false
    },
    deleteCreditSuccess(state, action) {
      state.data = state.data.filter((item) => item.id !== action.payload)
      state.loading = false
      state.successDelete = true
    },
    deleteCreditFailure(state, action) {
      state.loading = false
      state.successDelete = false
      state.error = action.payload
    },
  },
})

export const {
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
} = creditSlice.actions

export default creditSlice.reducer
