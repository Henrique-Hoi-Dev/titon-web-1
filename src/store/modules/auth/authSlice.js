import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token')
const initialState = {
  token: token || null,
  signed: !!token,
  loading: false,
  user: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInRequest(state) {
      state.loading = true
      state.error = null
    },
    signInSuccess(state, action) {
      state.token = action.payload.token
      state.user = action.payload.user
      state.signed = true
      state.loading = false
      state.error = null
    },
    signFailure(state, action) {
      state.loading = false
      state.error = action.payload.error
    },

    signOut(state) {
      state.token = null
      state.signed = false
      state.user = null
      state.error = null
    },
  },
})

export const { signInRequest, signInSuccess, signFailure, signOut } = authSlice.actions

export default authSlice.reducer
