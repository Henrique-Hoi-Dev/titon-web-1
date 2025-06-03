import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  selected: null,
  loading: false,
  error: null,
  selectOptions: [],
  success: false,
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
      state.loading = true;
      state.error = false;
    },
    getTrucksSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    getTrucksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    // Buscar por ID
    getTruckByIdRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTruckByIdSuccess: (state, action) => {
      state.selected = action.payload;
      state.loading = false;
    },
    getTruckByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Criar
    createTruckRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTruckSuccess: (state, action) => {
      state.data.push(action.payload);
      state.loading = false;
    },
    createTruckFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Atualizar
    updateTruckRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTruckSuccess: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      state.loading = false;
    },
    updateTruckFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Deletar
    deleteTruckRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTruckSuccess: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.loading = false;
    },
    deleteTruckFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Buscar opções para select
    getTrucksSelectRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getTrucksSelectSuccess(state, action) {
      state.selectOptions = action.payload;
      state.loading = false;
      state.error = null;
    },
    getTrucksSelectFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
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
  getTruckAvatarFailure
} = truckSlice.actions;

export default truckSlice.reducer;
