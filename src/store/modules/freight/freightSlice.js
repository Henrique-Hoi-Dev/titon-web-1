import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  selected: null,
  loading: false,
  error: null
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
      state.loading = true;
      state.error = null;
    },
    getFreightByIdSuccess: (state, action) => {
      state.selected = action.payload;
      state.loading = false;
    },
    getFreightByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Criar
    createFreightRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createFreightSuccess: (state, action) => {
      state.data.push(action.payload);
      state.loading = false;
    },
    createFreightFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Atualizar
    updateFreightRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateFreightSuccess: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      state.loading = false;
    },
    updateFreightFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Deletar
    deleteFreightRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteFreightSuccess: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.loading = false;
    },
    deleteFreightFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
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
  deleteFreightFailure
} = freightSlice.actions;

export default freightSlice.reducer;
