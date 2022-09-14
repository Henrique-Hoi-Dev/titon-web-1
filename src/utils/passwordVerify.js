export const passwordVerify = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return false;
  }
  return true;
};
