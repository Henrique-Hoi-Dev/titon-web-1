import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  selected: null,
  successCreate: false,
  successUpdate: false,
  successDelete: false,
  loading: false,
  loadingById: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  error: null,
  errorById: null,
  errorCreate: null,
  errorUpdate: null,
  errorDelete: null,
  loadingFirstCheck: false,
  errorFirstCheck: null,
  selectedFirstCheck: null,
};

const freightSlice = createSlice({
  name: 'freight',
  initialState,
  reducers: {
    // Listar todos os registros
    getFreightsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getFreightsSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    getFreightsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Buscar por ID
    getFreightByIdRequest: (state) => {
      state.loadingById = true;
      state.errorById = null;
    },
    getFreightByIdSuccess: (state, action) => {
      state.selected = action.payload;
      state.loadingById = false;
    },
    getFreightByIdFailure: (state, action) => {
      state.loadingById = false;
      state.errorById = action.payload;
    },

    // Criar
    createFreightRequest: (state) => {
      state.loadingCreate = true;
      state.errorCreate = null;
      state.successCreate = false;
    },
    createFreightSuccess: (state) => {
      state.loadingCreate = false;
      state.errorCreate = null;
      state.successCreate = true;
    },
    createFreightFailure: (state, action) => {
      state.loadingCreate = false;
      state.successCreate = false;
      state.errorCreate = action.payload;
    },

    // Atualizar
    updateFreightRequest: (state) => {
      state.loadingUpdate = true;
      state.errorUpdate = null;
      state.successUpdate = false;
    },
    updateFreightSuccess: (state) => {
      state.loadingUpdate = false;
      state.errorUpdate = null;
      state.successUpdate = true;
    },
    updateFreightFailure: (state, action) => {
      state.loadingUpdate = false;
      state.successUpdate = false;
      state.errorUpdate = action.payload;
    },

    // Deletar
    deleteFreightRequest: (state) => {
      state.loadingDelete = true;
      state.errorDelete = null;
      state.successDelete = false;
    },
    deleteFreightSuccess: (state) => {
      state.loadingDelete = false;
      state.errorDelete = null;
      state.successDelete = true;
    },
    deleteFreightFailure: (state, action) => {
      state.loadingDelete = false;
      state.successDelete = false;
      state.errorDelete = action.payload;
    },

    // Buscar por id do primeiro check
    getFirstCheckByIdRequest: (state) => {
      state.loadingFirstCheck = true;
      state.errorFirstCheck = null;
    },
    getFirstCheckByIdSuccess: (state, action) => {
      state.selectedFirstCheck = action.payload;
      state.loadingFirstCheck = false;
    },
    getFirstCheckByIdFailure: (state, action) => {
      state.loadingFirstCheck = false;
      state.errorFirstCheck = action.payload;
    },
  },
});

export const {
  getFreightsRequest,
  getFreightsSuccess,
  getFreightsFailure,
  getFreightByIdRequest,
  getFreightByIdSuccess,
  getFreightByIdFailure,
  createFreightRequest,
  createFreightSuccess,
  createFreightFailure,
  updateFreightRequest,
  updateFreightSuccess,
  updateFreightFailure,
  deleteFreightRequest,
  deleteFreightSuccess,
  deleteFreightFailure,
  getFirstCheckByIdRequest,
  getFirstCheckByIdSuccess,
  getFirstCheckByIdFailure,
} = freightSlice.actions;

export default freightSlice.reducer;
