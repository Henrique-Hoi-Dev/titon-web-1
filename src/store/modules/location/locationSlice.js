import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  selected: null,
  loading: false,
  error: null
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    // Listar todos os registros
    getLocationCityRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getLocationCitySuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    getLocationCityFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Buscar por ID
    getLocationStateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getLocationStateSuccess: (state, action) => {
      state.selected = action.payload;
      state.loading = false;
    },
    getLocationStateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getLocationCityRequest,
  getLocationCitySuccess,
  getLocationCityFailure,
  getLocationStateRequest,
  getLocationStateSuccess,
  getLocationStateFailure
} = locationSlice.actions;

export default locationSlice.reducer;
