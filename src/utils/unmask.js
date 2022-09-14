export const unmask = (string) => {
    return string.replace(/[^\d]/g, "");
  }