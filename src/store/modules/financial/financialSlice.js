import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  selected: null,
  loading: false,
  loadingGet: false,
  loadingById: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  successCreate: false,
  successUpdate: false,
  successDelete: false,
  errorGet: null,
  errorById: null,
  errorCreate: null,
  errorUpdate: null,
  errorDelete: null
};

const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    // Buscar lista
    getFinancialsRequest(state) {
      state.loadingGet = true;
      state.errorGet = null;
    },
    getFinancialsSuccess(state, action) {
      state.data = action.payload;
      state.loadingGet = false;
    },
    getFinancialsFailure(state, action) {
      state.loadingGet = false;
      state.errorGet = action.payload;
    },

    // Buscar por ID
    getFinancialByIdRequest(state) {
      state.loadingById = true;
      state.errorById = null;
    },
    getFinancialByIdSuccess(state, action) {
      state.selected = action.payload;
      state.loadingById = false;
    },
    getFinancialByIdFailure(state, action) {
      state.loadingById = false;
      state.errorById = action.payload;
    },

    // Criar
    createFinancialRequest(state) {
      state.loadingCreate = true;
      state.errorCreate = null;
      state.successCreate = false;
    },
    createFinancialSuccess(state) {
      state.loadingCreate = false;
      state.successCreate = true;
    },
    createFinancialFailure(state, action) {
      state.loadingCreate = false;
      state.errorCreate = action.payload;
      state.successCreate = false;
    },

    // Atualizar
    updateFinancialRequest(state) {
      state.loadingUpdate = true;
      state.errorUpdate = null;
      state.successUpdate = false;
    },
    updateFinancialSuccess(state) {
      state.loadingUpdate = false;
      state.successUpdate = true;
    },
    updateFinancialFailure(state, action) {
      state.loadingUpdate = false;
      state.successUpdate = false;
      state.errorUpdate = action.payload;
    },

    // Finalizar
    finishingFinancialRequest(state) {
      state.loading = true;
      state.error = null;
    },
    finishingFinancialSuccess(state) {
      state.loading = false;
    },
    finishingFinancialFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Deletar
    deleteFinancialRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteFinancialSuccess(state, action) {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.loading = false;
    },
    deleteFinancialFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetFinancialCreate(state) {
      state.successCreate = false;
      state.errorCreate = null;
      state.loadingCreate = false;
    },

    resetFinancialUpdate(state) {
      state.successUpdate = false;
      state.errorUpdate = null;
      state.loadingUpdate = false;
    },

    resetFinancialDelete(state) {
      state.successDelete = false;
      state.errorDelete = null;
      state.loadingDelete = false;
    }
  }
});

export const {
  getFinancialsRequest,
  getFinancialsSuccess,
  getFinancialsFailure,
  getFinancialByIdRequest,
  getFinancialByIdSuccess,
  getFinancialByIdFailure,
  createFinancialRequest,
  createFinancialSuccess,
  createFinancialFailure,
  updateFinancialRequest,
  updateFinancialSuccess,
  updateFinancialFailure,
  finishingFinancialRequest,
  finishingFinancialSuccess,
  finishingFinancialFailure,
  deleteFinancialRequest,
  deleteFinancialSuccess,
  deleteFinancialFailure,
  resetFinancialCreate,
  resetFinancialUpdate,
  resetFinancialDelete
} = financialSlice.actions;

export default financialSlice.reducer;
