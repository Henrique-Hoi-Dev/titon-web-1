export function createServicetRequest(values, id) {
  return {
    type: '@service/CREATE_SERVICE_REQUEST',
    payload: { values, id },
  };
}

export function getByIdServiceRequest(id) {
  return {
    type: '@service/GET_BYID_SERVICE_REQUEST',
    payload: { id },
  };
}

export function getByIdServiceSuccess(data) {
  return {
    type: '@service/GET_BYID_SERVICE_SUCCESS',
    payload: { data },
  };
}

export function findAllServiceRequest(id) {
  return {
    type: '@service/FINDALL_SERVICE_REQUEST',
    payload: { id },
  };
}

export function findAllServiceSuccess(data) {
  return {
    type: '@service/FIND_ALL_SERVICE_SUCCESS',
    payload: { data },
  };
}

export function deleteServiceRequest(id) {
  return {
    type: '@service/DELETE_SERVICE_REQUEST',
    payload: { id },
  };
}

export function serviceFailure() {
  return {
    type: '@service/SERVICE_FAILURE',
  };
}

export function resetFormulario() {
  return {
    type: '@service/RESET_FORM',
  };
}
