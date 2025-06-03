import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  selected: null,
  loading: false,
  error: null,
  selectOptions: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Buscar lista
    getCartsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getCartsSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    getCartsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Buscar por ID
    getCartByIdRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getCartByIdSuccess(state, action) {
      state.selected = action.payload;
      state.loading = false;
    },
    getCartByIdFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Criar
    createCartRequest(state) {
      state.loading = true;
      state.error = null;
    },
    createCartSuccess(state, action) {
      state.data.push(action.payload);
      state.loading = false;
    },
    createCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Atualizar
    updateCartRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateCartSuccess(state, action) {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      state.loading = false;
    },
    updateCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Deletar
    deleteCartRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteCartSuccess(state, action) {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.loading = false;
    },
    deleteCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Buscar opções para select
    getCartsSelectRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getCartsSelectSuccess(state, action) {
      state.selectOptions = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCartsSelectFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

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
  getCartsSelectFailure
} = cartSlice.actions;

export default cartSlice.reducer;
