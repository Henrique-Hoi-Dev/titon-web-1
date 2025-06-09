export const unmask = (string) => {
  return string.replace(/[^\d]/g, '')
}

export const unmaskPhone = (maskedPhone) => {
  return maskedPhone?.replace(/\D/g, '')
}
