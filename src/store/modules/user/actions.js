export function updateProfileRequest(avatarUrl, data, id) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { avatarUrl, data, id },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}
