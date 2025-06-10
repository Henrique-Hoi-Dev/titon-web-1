import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  states: [],
  cities: [],
  selected: null,
  loadingCities: false,
  loadingStates: false,
  errorCities: null,
  errorStates: null,
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    // Listar todos os registros
    getLocationCityRequest: (state) => {
      state.loadingCities = true
      state.errorCities = null
    },
    getLocationCitySuccess: (state, action) => {
      state.cities = action.payload
      state.loadingCities = false
    },
    getLocationCityFailure: (state, action) => {
      state.loadingCities = false
      state.error = action.payload
    },

    // Buscar por ID
    getLocationStateRequest: (state) => {
      state.loadingStates = true
      state.errorStates = null
    },
    getLocationStateSuccess: (state, action) => {
      state.states = action.payload
      state.loadingStates = false
    },
    getLocationStateFailure: (state, action) => {
      state.loadingStates = false
      state.errorStates = action.payload
    },
  },
})

export const {
  getLocationCityRequest,
  getLocationCitySuccess,
  getLocationCityFailure,
  getLocationStateRequest,
  getLocationStateSuccess,
  getLocationStateFailure,
} = locationSlice.actions

export default locationSlice.reducer
