export function createFinancialBoxRequest(id, values) {
  return {
    type: '@financialBox/CREATE_FINANCIALBOX_REQUEST',
    payload: { id, values },
  };
}

export function getByIdFinancialBoxRequest(id) {
  return {
    type: '@financialBox/GET_BYID_FINANCIALBOX_REQUEST',
    payload: { id },
  };
}
export function getByIdFinancialBoxSuccess(data) {
  return {
    type: '@financialBox/GET_BYID_FINANCIALBOX_SUCCESS',
    payload: { data },
  };
}

export function getCardRequest(data) {
  return {
    type: '@financialBox/GET_CARD_REQUEST',
    payload: { data },
  };
}
export function getCardSuccess(data) {
  return {
    type: '@financialBox/GET_CARD_SUCCESS',
    payload: { data },
  };
}

export function findAllFinancialBoxRequest(id) {
  return {
    type: '@financialBox/FIND_ALL_FINANCIALBOX_REQUEST',
    payload: { id },
  };
}
export function findAllFinancialBoxSuccess(data) {
  return {
    type: '@financialBox/FIND_ALL_FINANCIALBOX_SUCCESS',
    payload: { data },
  };
}

export function findAllOpenRequest(id) {
  return {
    type: '@financialBox/FIND_OPEN_REQUEST',
    payload: { id },
  };
}
export function findAllOpenSuccess(data) {
  return {
    type: '@financialBox/FIND_OPEN_SUCCESS',
    payload: { data },
  };
}

export function UpdateFinancialBoxRequest(id, data) {
  return {
    type: '@financialBox/UPDATE_FINANCIALBOX_REQUEST',
    payload: { id, data },
  };
}

export function deleteFinancialBoxRequest(id) {
  return {
    type: '@financialBox/DELETE_FINANCIALBOX_REQUEST',
    payload: { id },
  };
}

export function financialBoxFailure() {
  return {
    type: '@financialBox/FINANCIALBOX_FAILURE',
  };
}

export function resetFormulario() {
  return {
    type: '@financialBox/RESET_FORM',
  };
}

export function resetFormularioCaixa() {
  return {
    type: '@financialBox/RESET_FORM_CAIXA',
  };
}
