import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  selected: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Buscar lista
    getUsersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    getUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Buscar por ID
    getUserByIdRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getUserByIdSuccess(state, action) {
      state.selected = action.payload;
      state.loading = false;
    },
    getUserByIdFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Criar
    createUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess(state, action) {
      state.data.push(action.payload);
      state.loading = false;
    },
    createUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Atualizar
    updateUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action) {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      state.loading = false;
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Deletar
    deleteUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess(state, action) {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.loading = false;
    },
    deleteUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  getUserByIdRequest,
  getUserByIdSuccess,
  getUserByIdFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure
} = userSlice.actions;

export default userSlice.reducer;
