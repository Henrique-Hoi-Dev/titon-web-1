export function createProductRequest(data) {
  return {
    type: '@product/CREATE_PRODUCT_REQUEST',
    payload: { data },
  };
}

export function findAllProductRequest(data) {
  return {
    type: '@product/FINDALL_PRODUCT_REQUEST',
    payload: { data },
  };
}

export function findAllProductSuccess(data) {
  return {
    type: '@product/FIND_ALL_PRODUCT_SUCCESS',
    payload: { data },
  };
}

export function getByIdProductRequest(id) {
  return {
    type: '@product/GET_BYID_PRODUCT_REQUEST',
    payload: { id },
  };
}

export function getByIdProductSuccess(data) {
  return {
    type: '@product/GET_BYID_PRODUCT_SUCCESS',
    payload: { data },
  };
}

export function UpdateProductRequest(data) {
  return {
    type: '@product/UPDATE_PRODUCT_REQUEST',
    payload: { data },
  };
}

export function deleteProductRequest(data) {
  return {
    type: '@product/DELETE_PRODUCT_REQUEST',
    payload: { data },
  };
}

export function productFailure() {
  return {
    type: '@product/PRODUCT_FAILURE',
  };
}

export function resetFormularioProduct() {
  return {
    type: '@product/RESET_FORM',
  };
}
