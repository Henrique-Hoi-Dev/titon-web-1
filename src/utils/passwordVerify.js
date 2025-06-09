export const passwordVerify = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return false
  }
  return true
}

export const evaluateStrongPassword = (password = []) => {
  let punctuation = 0

  if (password.length === 0) {
    return { color: '', progress: 0 }
  }

  const criterias = [
    password.length >= 8, // Comprimento mínimo
    /[a-z]/.test(password), // Contém minúsculas
    /[A-Z]/.test(password), // Contém maiúsculas
    /\d/.test(password), // Contém números
    /[\W_]/.test(password), // Contém caracteres especiais
  ]

  // Calcula a pontuação com base nos critérios atendidos
  criterias.forEach((criteria) => {
    if (criteria) punctuation++
  })

  let color,
    progress = 0

  if (punctuation < 3) {
    color = '#d75252'
    progress = punctuation * 20
  } else if (punctuation < 5) {
    color = '#d7cd52'
    progress = 50 + (punctuation - 3) * 25
  } else {
    color = '#52d756'
    progress = 100
  }

  return { color, progress }
}
