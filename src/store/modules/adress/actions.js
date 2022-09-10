export function createAdressRequest(values, id) {
  return {
    type: '@adress/CREATE_ADRESS_REQUEST',
    payload: { values, id },
  };
}

export function getByIdAdresstRequest(id) {
  return {
    type: '@adress/GET_BYID_ADRESS_REQUEST',
    payload: { id },
  };
}

export function getByIdAdressSuccess(data) {
  return {
    type: '@adress/GET_BYID_ADRESS_SUCCESS',
    payload: { data },
  };
}

export function updateAdressRequest(data, id) {
  return {
    type: '@adress/UPDATE_ADRESS_REQUEST',
    payload: { data, id },
  };
}

export function updateAdressSuccess(adresses) {
  return {
    type: '@adress/UPDATE_ADRESS_SUCCESS',
    payload: { adresses },
  };
}

export function adressFailure() {
  return {
    type: '@adress/ADRESS_FAILURE',
  };
}

export function resetFormulario() {
  return {
    type: '@adress/RESET_FORM',
  };
}