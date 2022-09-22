export function signInRequest(email, pw) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, pw },
  };
}

export function signInSuccess(token, users) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, users },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
