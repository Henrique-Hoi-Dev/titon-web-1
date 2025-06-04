import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  selected: null,
  loading: false,
  loadingGet: false,
  loadingGetById: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  loadingSelect: false,
  error: null,
  errorGet: null,
  errorGetById: null,
  errorCreate: null,
  errorUpdate: null,
  errorDelete: null,
  errorSelect: null,
  selectOptions: [],
  success: false,
  successGet: false,
  successGetById: false,
  successCreate: false,
  successUpdate: false,
  successDelete: false,
  successSelect: false,
  avatar: null,
  avatarLoading: false,
  avatarError: null
};

const truckSlice = createSlice({
  name: 'truck',
  initialState,
  reducers: {
    // Listar todos os registros
    getTrucksRequest: (state) => {
      state.loadingGet = true;
      state.errorGet = null;
      state.successGet = false;
    },
    getTrucksSuccess: (state, action) => {
      state.data = action.payload;
      state.loadingGet = false;
      state.errorGet = null;
      state.successGet = true;
    },
    getTrucksFailure: (state, action) => {
      state.loadingGet = false;
      state.errorGet = action.payload;
      state.successGet = false;
    },

    // Buscar por ID
    getTruckByIdRequest: (state) => {
      state.loadingGetById = true;
      state.errorGetById = null;
      state.successGetById = false;
    },
    getTruckByIdSuccess: (state, action) => {
      state.selected = action.payload;
      state.loadingGetById = false;
      state.errorGetById = null;
      state.successGetById = true;
    },
    getTruckByIdFailure: (state, action) => {
      state.loadingGetById = false;
      state.errorGetById = action.payload;
      state.successGetById = false;
    },

    // Criar
    createTruckRequest: (state) => {
      state.loadingCreate = true;
      state.errorCreate = null;
      state.successCreate = false;
    },
    createTruckSuccess: (state) => {
      state.loadingCreate = false;
      state.errorCreate = null;
      state.successCreate = true;
    },
    createTruckFailure: (state, action) => {
      state.loadingCreate = false;
      state.errorCreate = action.payload;
      state.successCreate = false;
    },

    // Atualizar
    updateTruckRequest: (state) => {
      state.loadingUpdate = true;
      state.errorUpdate = null;
      state.successUpdate = false;
    },
    updateTruckSuccess: (state, action) => {
      state.loadingUpdate = false;
      state.errorUpdate = null;
      state.successUpdate = true;
    },
    updateTruckFailure: (state, action) => {
      state.loadingUpdate = false;
      state.successUpdate = false;
      state.errorUpdate = action.payload;
    },

    // Deletar
    deleteTruckRequest: (state) => {
      state.loadingDelete = true;
      state.errorDelete = null;
      state.successDelete = false;
    },
    deleteTruckSuccess: (state, action) => {
      state.loadingDelete = false;
      state.errorDelete = null;
      state.successDelete = true;
    },
    deleteTruckFailure: (state, action) => {
      state.loadingDelete = false;
      state.errorDelete = action.payload;
      state.successDelete = false;
    },

    // Buscar opções para select
    getTrucksSelectRequest(state) {
      state.loadingSelect = true;
      state.errorSelect = null;
      state.successSelect = false;
    },
    getTrucksSelectSuccess(state, action) {
      state.selectOptions = action.payload;
      state.loadingSelect = false;
      state.errorSelect = null;
    },
    getTrucksSelectFailure(state, action) {
      state.loadingSelect = false;
      state.errorSelect = action.payload;
    },

    // Buscar avatar
    getTruckAvatarRequest(state) {
      state.avatarLoading = true;
      state.avatarError = null;
    },
    getTruckAvatarSuccess(state, action) {
      state.avatar = action.payload;
      state.avatarLoading = false;
      state.avatarError = null;
    },
    getTruckAvatarFailure(state, action) {
      state.avatarLoading = false;
      state.avatarError = action.payload;
    }
  },

  resetTruckCreate(state) {
    state.successCreate = false;
    state.errorCreate = null;
    state.loadingCreate = false;
  },

  resetTruckUpdate(state) {
    state.successUpdate = false;
    state.errorUpdate = null;
    state.loadingUpdate = false;
  },

  resetTruckDelete(state) {
    state.successDelete = false;
    state.errorDelete = null;
    state.loadingDelete = false;
  }
});

export const {
  getTrucksRequest,
  getTrucksSuccess,
  getTrucksFailure,
  getTruckByIdRequest,
  getTruckByIdSuccess,
  getTruckByIdFailure,
  createTruckRequest,
  createTruckSuccess,
  createTruckFailure,
  updateTruckRequest,
  updateTruckSuccess,
  updateTruckFailure,
  deleteTruckRequest,
  deleteTruckSuccess,
  deleteTruckFailure,
  getTrucksSelectRequest,
  getTrucksSelectSuccess,
  getTrucksSelectFailure,
  getTruckAvatarRequest,
  getTruckAvatarSuccess,
  getTruckAvatarFailure,
  resetTruckCreate,
  resetTruckUpdate,
  resetTruckDelete
} = truckSlice.actions;

export default truckSlice.reducer;
