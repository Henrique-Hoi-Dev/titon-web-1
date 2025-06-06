import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  selected: null,
  loading: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  loadingGetById: false,
  loadingGetUsers: false,
  errorCreate: null,
  errorUpdate: null,
  errorDelete: null,
  errorGetById: null,
  errorGetUsers: null,
  successCreate: false,
  successUpdate: false,
  successDelete: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Buscar lista
    getUsersRequest(state) {
      state.loadingGetUsers = true;
      state.errorGetUsers = null;
    },
    getUsersSuccess(state, action) {
      state.data = action.payload;
      state.loadingGetUsers = false;
    },
    getUsersFailure(state, action) {
      state.loadingGetUsers = false;
      state.errorGetUsers = action.payload;
    },

    // Buscar por ID
    getUserByIdRequest(state) {
      state.loadingGetById = true;
      state.errorGetById = null;
    },
    getUserByIdSuccess(state, action) {
      state.selected = action.payload;
      state.loadingGetById = false;
    },
    getUserByIdFailure(state, action) {
      state.loadingGetById = false;
      state.errorGetById = action.payload;
    },

    // Criar
    createUserRequest(state) {
      state.loadingCreate = true;
      state.errorCreate = null;
    },
    createUserSuccess(state) {
      state.loadingCreate = false;
      state.successCreate = true;
      state.errorCreate = null;
    },
    createUserFailure(state, action) {
      state.loadingCreate = false;
      state.successCreate = false;
      state.errorCreate = action.payload;
    },

    // Atualizar
    updateUserRequest(state) {
      state.loadingUpdate = true;
      state.errorUpdate = null;
    },
    updateUserSuccess(state) {
      state.loadingUpdate = false;
      state.successUpdate = true;
      state.errorUpdate = null;
    },
    updateUserFailure(state, action) {
      state.loadingUpdate = false;
      state.successUpdate = false;
      state.errorUpdate = action.payload;
    },

    // Deletar
    deleteUserRequest(state) {
      state.loadingDelete = true;
      state.errorDelete = null;
    },
    deleteUserSuccess(state, action) {
      state.loadingDelete = false;
      state.successDelete = true;
      state.errorDelete = null;
    },
    deleteUserFailure(state, action) {
      state.loadingDelete = false;
      state.successDelete = false;
      state.errorDelete = action.payload;
    },

    resetUserCreate(state) {
      state.successCreate = false;
      state.loadingCreate = false;
      state.errorCreate = null;
    },

    resetUserUpdate(state) {
      state.successUpdate = false;
      state.loadingUpdate = false;
      state.errorUpdate = null;
    },

    resetUserDelete(state) {
      state.successDelete = false;
      state.loadingDelete = false;
      state.errorDelete = null;
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
  deleteUserFailure,
  resetUserCreate,
  resetUserUpdate,
  resetUserDelete
} = userSlice.actions;

export default userSlice.reducer;
