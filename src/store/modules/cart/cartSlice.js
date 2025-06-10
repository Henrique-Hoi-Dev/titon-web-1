import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  selectedCreate: null,
  selected: null,
  loading: false,
  loadingGet: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  loadingSelect: false,
  error: null,
  errorGet: null,
  errorCreate: null,
  errorUpdate: null,
  errorDelete: null,
  errorSelect: null,
  success: false,
  successGet: false,
  successCreate: false,
  successUpdate: false,
  successDelete: false,
  successSelect: false,
  selectOptions: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Buscar lista
    getCartsRequest(state) {
      state.loadingGet = true
      state.errorGet = null
      state.successGet = false
    },
    getCartsSuccess(state, action) {
      state.data = action.payload
      state.loadingGet = false
      state.errorGet = null
      state.successGet = true
    },
    getCartsFailure(state, action) {
      state.loadingGet = false
      state.successGet = false
      state.errorGet = action.payload
    },

    // Buscar por ID
    getCartByIdRequest(state) {
      state.loading = true
      state.error = null
      state.success = false
    },
    getCartByIdSuccess(state, action) {
      state.selected = action.payload
      state.loading = false
      state.error = null
      state.success = true
    },
    getCartByIdFailure(state, action) {
      state.loading = false
      state.success = false
      state.error = action.payload
    },

    // Criar
    createCartRequest(state) {
      state.loadingCreate = true
      state.errorCreate = null
      state.successCreate = false
    },
    createCartSuccess(state, action) {
      state.selectedCreate = action.payload
      state.loadingCreate = false
      state.errorCreate = null
      state.successCreate = true
    },
    createCartFailure(state, action) {
      state.loadingCreate = false
      state.successCreate = false
      state.errorCreate = action.payload
    },

    // Atualizar
    updateCartRequest(state) {
      state.loadingUpdate = true
      state.errorUpdate = null
      state.successUpdate = false
    },
    updateCartSuccess(state) {
      state.loadingUpdate = false
      state.errorUpdate = null
      state.successUpdate = true
    },
    updateCartFailure(state, action) {
      state.loadingUpdate = false
      state.successUpdate = false
      state.errorUpdate = action.payload
    },

    // Deletar
    deleteCartRequest(state) {
      state.loadingDelete = true
      state.errorDelete = null
      state.successDelete = false
    },
    deleteCartSuccess(state) {
      state.loadingDelete = false
      state.errorDelete = null
      state.successDelete = true
    },
    deleteCartFailure(state, action) {
      state.loadingDelete = false
      state.successDelete = false
      state.errorDelete = action.payload
    },

    // Buscar opções para select
    getCartsSelectRequest(state) {
      state.loadingSelect = true
      state.errorSelect = null
      state.successSelect = false
    },
    getCartsSelectSuccess(state, action) {
      state.selectOptions = action.payload
      state.loadingSelect = false
      state.errorSelect = null
      state.successSelect = true
    },
    getCartsSelectFailure(state, action) {
      state.loadingSelect = false
      state.successSelect = false
      state.errorSelect = action.payload
    },

    resetCartCreate(state) {
      state.loadingCreate = false
      state.errorCreate = null
      state.successCreate = false
    },

    resetCartUpdate(state) {
      state.loadingUpdate = false
      state.errorUpdate = null
      state.successUpdate = false
    },

    resetCartDelete(state) {
      state.loadingDelete = false
      state.errorDelete = null
      state.successDelete = false
    },
  },
})

export const {
  getCartsRequest,
  getCartsSuccess,
  getCartsFailure,
  getCartByIdRequest,
  getCartByIdSuccess,
  getCartByIdFailure,
  createCartRequest,
  createCartSuccess,
  createCartFailure,
  updateCartRequest,
  updateCartSuccess,
  updateCartFailure,
  deleteCartRequest,
  deleteCartSuccess,
  deleteCartFailure,
  getCartsSelectRequest,
  getCartsSelectSuccess,
  getCartsSelectFailure,
  resetCartCreate,
  resetCartUpdate,
  resetCartDelete,
} = cartSlice.actions

export default cartSlice.reducer
